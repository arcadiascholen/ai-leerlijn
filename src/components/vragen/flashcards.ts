// The logic of <Flashcards> (docs/BRIEFING.md § 12, "Vraagtypes"), without React
// and without the page: the parser of the pasted list, and everything that
// follows from what is stored. The island, the summary and the build
// (checks.ts) all read the same text through this file.

import type { FlashcardRound, FlashcardsContent, FlashcardsScreen } from './answers';

// A list longer than this keeps its first cards, and the student is told how
// many fell away.
export const MAX_CARDS = 30;

// How many cards the overview and the PDF name as the hardest.
const MAX_HARDEST = 3;

export interface Card {
  readonly front: string;
  readonly back: string;
}

export interface Deck {
  readonly cards: readonly Card[];
  // The lines that are not a card, as the student pasted them.
  readonly unreadable: readonly string[];
  // How many cards fell away beyond MAX_CARDS.
  readonly dropped: number;
}

// `| --- | :--: |` or `---|---`: at least one `|`, or it is just a line of
// dashes, which is not a table.
const TABLE_SEPARATOR = /^\|?(?:\s*:?-+:?\s*\|)+(?:\s*:?-+:?\s*)?$/;
// A code fence, with or without a language. On one line with text after it, it
// is not a fence, and the backticks are cleaned up like any other.
const CODE_FENCE = /^`{3,}[\w-]*$/;
// Bullets and numbering at the start of a line, also combined. They need a space
// behind them, so "-5 + 3" and "1.5 + 2" stay whole; a "•" is never part of a
// formula.
const LEADING_MARKS = /^(?:[-*]\s+|•\s*|\d+[.)]\s+)+/u;
const HEADER_ROWS: ReadonlySet<string> = new Set(['vraag|antwoord', 'voorkant|achterkant']);

// `**` is bold, unless it stands between two values: "2**3" is a power. `2*3` has
// a single star and is never touched. Backticks go everywhere.
function withoutMarkup(line: string): string {
  return line
    .replace(/\*{2,}/g, (stars: string, at: number, whole: string) => {
      const before = whole.charAt(at - 1);
      const after = whole.charAt(at + stars.length);
      return /[\p{L}\p{N})]/u.test(before) && /[\p{L}\p{N}(]/u.test(after) ? stars : '';
    })
    .replace(/`/g, '');
}

function isSeparator(line: string): boolean {
  return TABLE_SEPARATOR.test(line.trim());
}

// Reads what a student pastes, or what an AI makes of "one card per line":
// `front | back`, with or without bullets, numbering, bold, backticks, a code
// fence or a Markdown table around it. Everything else is listed, not guessed at:
// a third column could be anything, and a sentence is not a card.
export function parseDeck(text: string): Deck {
  const lines = text.split(/\r\n?|\n/);
  const cards: Card[] = [];
  const unreadable: string[] = [];
  lines.forEach((raw, index) => {
    const line = raw.trim();
    if (line === '' || CODE_FENCE.test(line) || isSeparator(line)) return;
    // The header of a table is the row right above its separator.
    if (line.includes('|') && isSeparator(lines[index + 1] ?? '')) return;
    const cleaned = withoutMarkup(line).trim().replace(LEADING_MARKS, '').trim();
    const row = /^\|.*\|$/.test(cleaned) ? cleaned.slice(1, -1) : cleaned;
    const sides = row.split('|').map((side) => side.trim());
    const [front, back] = sides;
    if (sides.length !== 2 || front === undefined || back === undefined || front === '' || back === '') {
      unreadable.push(line);
      return;
    }
    if (HEADER_ROWS.has(`${front}|${back}`.toLowerCase())) return;
    cards.push({ front, back });
  });
  return {
    cards: cards.slice(0, MAX_CARDS),
    unreadable,
    dropped: Math.max(0, cards.length - MAX_CARDS),
  };
}

// The positions of `count` cards in a random order, unless there is only one
// such order, different from `previous`, so that a new round never repeats the
// last one.
export function shuffled(count: number, previous?: readonly number[]): number[] {
  const shuffle = (): number[] => {
    const order = Array.from({ length: count }, (_, index) => index);
    for (let from = count - 1; from > 0; from--) {
      const to = Math.floor(Math.random() * (from + 1));
      const swapped = order[from] as number;
      order[from] = order[to] as number;
      order[to] = swapped;
    }
    return order;
  };
  let order = shuffle();
  while (count > 1 && previous !== undefined && order.join() === previous.join()) order = shuffle();
  return order;
}

export function newRound(count: number, previous?: readonly number[]): FlashcardRound {
  const order = shuffled(count, previous);
  return { order, queue: order, misses: Array.from({ length: count }, () => 0), typed: '', flipped: false };
}

export const NO_FLASHCARDS: FlashcardsContent = {
  text: '',
  screen: 'paste',
  practised: '',
  round: null,
  last: null,
  scored: false,
};

function isCount(value: number): boolean {
  return Number.isInteger(value) && value >= 0;
}

// The stored shape is checked by `readAnswer`; this checks that it fits these
// cards. Something that does not fit counts as not there: a queue with a card
// that does not exist would crash the practice screen, and it can only come from
// a value edited by hand.
function fittingRound(round: FlashcardRound | null, count: number): FlashcardRound | null {
  if (round === null) return null;
  const isCard = (card: number): boolean => isCount(card) && card < count;
  const fits =
    round.order.length === count &&
    new Set(round.order).size === count &&
    round.order.every(isCard) &&
    new Set(round.queue).size === round.queue.length &&
    round.queue.every(isCard) &&
    round.misses.length === count &&
    round.misses.every(isCount);
  return fits ? round : null;
}

function fittingMisses(misses: number[] | null, count: number): number[] | null {
  return misses !== null && misses.length === count && misses.every(isCount) ? misses : null;
}

// What the stored state comes down to now.
export interface FlashcardsView extends Deck {
  readonly screen: FlashcardsScreen;
  // The round and the last finished one, when they belong to these cards.
  readonly round: FlashcardRound | null;
  readonly last: number[] | null;
  readonly scored: boolean;
  // Whether the cards in the field are the cards that were practised.
  readonly sameDeck: boolean;
  // There was a practice, and the field now holds other cards.
  readonly changed: boolean;
}

// A round and a score belong to the cards they were practised with. As soon as
// the field holds other cards they no longer count, but they are only overwritten
// when the student starts practising: undoing an edit brings them back.
export function viewOf(content: FlashcardsContent): FlashcardsView {
  const deck = parseDeck(content.text);
  const count = deck.cards.length;
  const practised = parseDeck(content.practised).cards;
  const sameDeck = count > 0 && JSON.stringify(practised) === JSON.stringify(deck.cards);
  if (!sameDeck) {
    const hadPractice = practised.length > 0 && (content.round !== null || content.last !== null);
    return { ...deck, screen: 'paste', round: null, last: null, scored: false, sameDeck, changed: hadPractice };
  }
  const round = fittingRound(content.round, count);
  const last = fittingMisses(content.last, count);
  const active = round !== null && round.queue.length > 0;
  let screen: FlashcardsScreen = 'paste';
  if (content.screen === 'practice' && active) screen = 'practice';
  else if (content.screen !== 'paste' && last !== null) screen = 'done';
  return { ...deck, screen, round, last, scored: content.scored, sameDeck, changed: false };
}

export interface HardCard {
  readonly front: string;
  readonly misses: number;
}

// The cards with the most "Nog niet", at least once, in the order of the deck
// when they are equal.
export function hardest(cards: readonly Card[], misses: readonly number[]): HardCard[] {
  return cards
    .map((card, index) => ({ front: card.front, misses: misses[index] ?? 0 }))
    .filter((card) => card.misses > 0)
    .sort((a, b) => b.misses - a.misses)
    .slice(0, MAX_HARDEST);
}

export function firstTimeRight(misses: readonly number[]): number {
  return misses.filter((count) => count === 0).length;
}

// What the summary says about a deck. `done` is the last finished round, also
// while a new one is running: that one only counts once it is finished.
export type FlashcardsScore =
  | { readonly status: 'empty'; readonly total: 0 }
  | { readonly status: 'new'; readonly total: number }
  | { readonly status: 'busy'; readonly total: number; readonly known: number; readonly hardest: readonly HardCard[] }
  | { readonly status: 'done'; readonly total: number; readonly right: number; readonly hardest: readonly HardCard[] };

export function scoreOf(content: FlashcardsContent): FlashcardsScore {
  const { cards, last, round, scored } = viewOf(content);
  const total = cards.length;
  if (total === 0) return { status: 'empty', total: 0 };
  if (last !== null) return { status: 'done', total, right: firstTimeRight(last), hardest: hardest(cards, last) };
  if (round === null || !scored) return { status: 'new', total };
  return { status: 'busy', total, known: total - round.queue.length, hardest: hardest(cards, round.misses) };
}
