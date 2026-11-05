// Stored answers of the question components (docs/BRIEFING.md § 12).
//
// Every question has an `id` that the author writes, unique within the
// module. Its answer is stored as JSON under
// `ai-leerlijn:<module-id>:vraag:<id>`, through the helpers in
// ../stappen/storage.ts, so "Opnieuw beginnen" clears it with the rest of the
// module.
//
// In the static HTML every question's root element carries
// `data-question="<kind>"` and `data-question-id="<id>"`, also in steps that
// are hidden and not hydrated yet. The questions that the summary shows
// (`think-first`, `reflection`, `prompt-fields`, `measure`, `flashcards` and
// `takeaway-card`) also carry `data-question-text`, the question as it is on the
// page now. A `measure` carries `data-measure-max`, the top of its score, and a
// `takeaway-card` `data-takeaway-rows`, the rows as the author wrote them. A `choice-chat` carries
// `data-question-text` too, the title of its step, although only the timeline
// shows it. The summary at the end of a module
// (../stappen/Samenvatting.tsx) walks those elements in document order, which
// is the order of the module, and reads each answer with `readAnswer`. It
// takes the question from the page, not from storage: the stored question
// is the one the student saw, and goes stale when an author rewrites it.
//
// Every answer, of every kind, also carries two times (AnswerTimes), for the
// timeline in the PDF of the summary. `writeAnswer` sets them, not the
// components.

import { readStored, writeStored } from '../stappen/storage';

export type QuestionKind =
  | 'multiple-choice'
  | 'think-first'
  | 'reflection'
  | 'prompt-fields'
  | 'measure'
  | 'choice-chat'
  | 'flashcards'
  | 'takeaway-card';

// <Meerkeuze>: the options the student chose, as indices into the options in
// the order the author wrote them, in the order they were chosen.
export interface MultipleChoiceAnswer {
  kind: 'multiple-choice';
  question: string;
  chosen: number[];
}

// <DenkEerst>: what the student wrote, and whether the example answer was
// shown. `question` is the question as the student saw it, so that a summary
// can show it next to the answer.
export interface ThinkFirstAnswer {
  kind: 'think-first';
  question: string;
  answer: string;
  shown: boolean;
}

// <Reflectie>: what the student wrote, with the question as they saw it.
export interface ReflectionAnswer {
  kind: 'reflection';
  question: string;
  answer: string;
}

// <Prompt velden={…}>: what the student wrote in each field, by the name of
// the placeholder it fills in. `question` is the title of the step the
// prompt is in, as the student saw it.
export interface PromptFieldsAnswer {
  kind: 'prompt-fields';
  question: string;
  fields: Record<string, string>;
}

// <Meting>: the score from 0 to `max`, and how sure the student is, from 1 to
// CONFIDENCE_MAX. Stored from the first click, so either can still be null.
export interface MeasureAnswer {
  kind: 'measure';
  question: string;
  score: number | null;
  max: number;
  confidence: number | null;
}

// <Keuzechat>: per round the messages the student chose, as indices into the
// messages in the order the author wrote them, in the order they were chosen.
// `question` is the title of the step the conversation is in, as the student
// saw it. This only checks the shape; whether the indices still fit the rounds
// on the page is for the component (Keuzechat.tsx).
export interface ChoiceChatAnswer {
  kind: 'choice-chat';
  question: string;
  chosen: number[][];
}

// <Flashcards>: where the student is. The cards themselves are never stored: they
// follow from `text` (flashcards.ts). This only checks the shape; whether a round
// still fits the cards is for `viewOf` in flashcards.ts.
export type FlashcardsScreen = 'paste' | 'practice' | 'done';

export interface FlashcardRound {
  // The order the round started in, so that the next round can differ.
  order: number[];
  // The cards still to know, as indices into the cards: the first one is on
  // screen.
  queue: number[];
  // Per card, how often the student said "Nog niet" in this round.
  misses: number[];
  // The answer to the card on screen, and whether it was turned over.
  typed: string;
  flipped: boolean;
}

export interface FlashcardsContent {
  // What is in the field of the paste screen.
  text: string;
  screen: FlashcardsScreen;
  // The text that `round` and `last` were practised with.
  practised: string;
  // The running round, or the last one with an empty queue.
  round: FlashcardRound | null;
  // `misses` of the last finished round.
  last: number[] | null;
  // Whether the student scored a card of this deck at all.
  scored: boolean;
}

export interface FlashcardsAnswer extends FlashcardsContent {
  kind: 'flashcards';
  question: string;
}

// <Meeneemkaart>: one row per situation, with the sentence as it stands now: the
// author's, or what the student made of it. '' is a row the student emptied.
export interface TakeawayRow {
  situation: string;
  text: string;
}

export interface TakeawayCardAnswer {
  kind: 'takeaway-card';
  question: string;
  rows: TakeawayRow[];
}

// What a component writes. A new kind of question goes here.
export type AnswerContent =
  | MultipleChoiceAnswer
  | ThinkFirstAnswer
  | ReflectionAnswer
  | PromptFieldsAnswer
  | MeasureAnswer
  | ChoiceChatAnswer
  | FlashcardsAnswer
  | TakeawayCardAnswer;

// When the student first saved an answer to the question, and when last, as
// ISO 8601 (`toISOString`). Missing on an answer stored before the site kept
// times, and dropped when it is not a valid time.
export interface AnswerTimes {
  firstAt?: string;
  lastAt?: string;
}

export type StoredAnswer = AnswerContent & AnswerTimes;

export function answerKey(questionId: string): string {
  return `vraag:${questionId}`;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

// The top of the confidence row of a <Meting>, which starts at 1.
export const CONFIDENCE_MAX = 5;

// null, or a whole number from `min` to `max`.
function isChoiceInRange(value: unknown, min: number, max: number): boolean {
  return value === null || (Number.isInteger(value) && (value as number) >= min && (value as number) <= max);
}

// A time as `toISOString` writes it, or with an offset; "gisteren" is none.
const ISO_TIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:\d{2})$/;

export function isTime(value: unknown): value is string {
  return typeof value === 'string' && ISO_TIME.test(value) && !Number.isNaN(Date.parse(value));
}

function isWholeNumbers(value: unknown): value is number[] {
  return Array.isArray(value) && value.every((item) => Number.isInteger(item));
}

function isFlashcardRound(value: unknown): boolean {
  return (
    isRecord(value) &&
    isWholeNumbers(value.order) &&
    isWholeNumbers(value.queue) &&
    isWholeNumbers(value.misses) &&
    typeof value.typed === 'string' &&
    typeof value.flipped === 'boolean'
  );
}

// Checks the content only: the times are optional, and `readAnswer` drops an
// invalid one without dropping the answer.
function isStoredAnswer(value: unknown): value is AnswerContent & Record<string, unknown> {
  if (!isRecord(value) || typeof value.question !== 'string') return false;
  switch (value.kind) {
    case 'multiple-choice':
      return Array.isArray(value.chosen) && value.chosen.every((index) => Number.isInteger(index));
    case 'think-first':
      return typeof value.answer === 'string' && typeof value.shown === 'boolean';
    case 'reflection':
      return typeof value.answer === 'string';
    case 'prompt-fields':
      return (
        isRecord(value.fields) &&
        !Array.isArray(value.fields) &&
        Object.values(value.fields).every((field) => typeof field === 'string')
      );
    case 'measure':
      return (
        Number.isInteger(value.max) &&
        (value.max as number) >= 1 &&
        isChoiceInRange(value.score, 0, value.max as number) &&
        isChoiceInRange(value.confidence, 1, CONFIDENCE_MAX)
      );
    case 'choice-chat':
      return (
        Array.isArray(value.chosen) &&
        value.chosen.every((round) => Array.isArray(round) && round.every((index) => Number.isInteger(index)))
      );
    case 'flashcards':
      return (
        typeof value.text === 'string' &&
        (value.screen === 'paste' || value.screen === 'practice' || value.screen === 'done') &&
        typeof value.practised === 'string' &&
        (value.round === null || isFlashcardRound(value.round)) &&
        (value.last === null || isWholeNumbers(value.last)) &&
        typeof value.scored === 'boolean'
      );
    case 'takeaway-card':
      return (
        Array.isArray(value.rows) &&
        value.rows.every((row) => isRecord(row) && typeof row.situation === 'string' && typeof row.text === 'string')
      );
    default:
      return false;
  }
}

// The stored answer of one question, or null if there is none, if storage is
// blocked, or if the value is not a valid answer (edited by hand, or from an
// older version of the site). A time that is not valid counts as no time.
export function readAnswer(moduleId: string, questionId: string): StoredAnswer | null {
  const raw = readStored(moduleId, answerKey(questionId));
  if (raw === null) return null;
  try {
    const value: unknown = JSON.parse(raw);
    if (!isStoredAnswer(value)) return null;
    const { firstAt, lastAt, ...content } = value;
    return {
      ...(content as AnswerContent),
      ...(isTime(firstAt) ? { firstAt } : {}),
      ...(isTime(lastAt) ? { lastAt } : {}),
    };
  } catch {
    return null;
  }
}

// Stores `answer` with its times: `firstAt` stays what it was, or becomes now
// on the first save, and `lastAt` becomes now. So `firstAt` stays the moment
// the student started on the question, although <Reflectie> saves on every
// keystroke.
export function writeAnswer(moduleId: string, questionId: string, answer: AnswerContent): void {
  const now = new Date().toISOString();
  const firstAt = readAnswer(moduleId, questionId)?.firstAt ?? now;
  const stored: StoredAnswer = { ...answer, firstAt, lastAt: now };
  writeStored(moduleId, answerKey(questionId), JSON.stringify(stored));
}

// What a <Meting> holds now: its `element` is the root in the static HTML, also
// in a step that is hidden and not hydrated yet. A score stored on another
// scale (an author changed `max` after publishing) counts as not chosen: "3 van
// 5" says nothing about a row up to 10.
export interface MeasureValues {
  readonly score: number | null;
  readonly max: number;
  readonly confidence: number | null;
}

export function readMeasure(moduleId: string, element: HTMLElement): MeasureValues {
  const max = Number(element.dataset.measureMax);
  const stored = readAnswer(moduleId, element.dataset.questionId ?? '');
  if (stored?.kind !== 'measure') return { score: null, max, confidence: null };
  return { score: stored.max === max ? stored.score : null, max, confidence: stored.confidence };
}

// The rows of a <Meeneemkaart> as the author wrote them: `element` is the root in
// the static HTML, also in a step that is hidden and not hydrated yet.
export function authorRowsOf(element: HTMLElement): TakeawayRow[] {
  return JSON.parse(element.dataset.takeawayRows ?? '[]') as TakeawayRow[];
}

// What a <Meeneemkaart> holds now, or null while nothing is stored: the student
// has not seen its step. Stored rows are matched to the card on the page by their
// situation, because an author may have changed the card after publishing: a
// situation that is new gets the author's sentence, one that is gone drops out.
export function readTakeawayRows(moduleId: string, element: HTMLElement): TakeawayRow[] | null {
  const stored = readAnswer(moduleId, element.dataset.questionId ?? '');
  if (stored?.kind !== 'takeaway-card') return null;
  return authorRowsOf(element).map(({ situation, text }) => ({
    situation,
    text: stored.rows.find((row) => row.situation === situation)?.text ?? text,
  }));
}

export function writeTakeawayRows(moduleId: string, element: HTMLElement, rows: TakeawayRow[]): void {
  writeAnswer(moduleId, element.dataset.questionId ?? '', {
    kind: 'takeaway-card',
    question: element.dataset.questionText ?? '',
    rows,
  });
}
