// Build-time plumbing for the content components in this folder
// (docs/BRIEFING.md § 12, "Prompts en gesprekken"): <Prompt>, and <Chat>
// with its turns <Jij> and <AI>. MDX children are not type-checked, so a
// mistake in a module (an empty prompt, text outside a turn) fails the build
// with a clear message instead of reaching a student.

// Every tag in rendered HTML, with its name. Astro escapes `<` and `>` in
// text and in attribute values, so a `>` always ends a tag.
const TAG_PATTERN = /<\/?([A-Za-z][\w-]*)[^>]*>/g;

// What a prompt may hold: paragraphs of text with inline Markdown. The
// student copies it as plain text, so a list, a heading, an image or a
// component would be lost or garbled on the clipboard.
const PROMPT_ELEMENTS = new Set(['p', 'br', 'strong', 'em', 'code', 'a', 'del']);

// A placeholder for the student to fill in, such as [datum]. Only within one
// run of text: `[**vak**]` is left as it is.
const PLACEHOLDER_PATTERN = /\[[^[\]]+\]/g;

// The character references Astro writes when it escapes text (`&<>"'`),
// and the one an author is likely to type.
const NAMED_REFERENCES: Readonly<Record<string, string>> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: '\u00a0',
};

function decodeReferences(text: string): string {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (reference, name: string) => {
    if (name.startsWith('#')) {
      const hex = name.charAt(1) === 'x' || name.charAt(1) === 'X';
      return String.fromCodePoint(Number.parseInt(name.slice(hex ? 2 : 1), hex ? 16 : 10));
    }
    const char = NAMED_REFERENCES[name];
    if (char === undefined) {
      // Better a failed build than a prompt with "&eacute;" on the clipboard.
      throw new Error(`<Prompt>: cannot turn ${reference} into plain text. Type the character itself.`);
    }
    return char;
  });
}

// The prompt as the student copies it: a blank line between paragraphs, a
// line break where the author wrote a hard break (<br>), and every other run
// of white space, such as a line break in the source, a single space, as
// Markdown shows it. A prompt written on the same line as its tags has no
// <p> around it; it is one paragraph.
function promptText(html: string): string {
  return html
    .split(/<\/?p\b[^>]*>/i)
    .map((paragraph) =>
      paragraph
        .split(/<br\b[^>]*>/i)
        .map((line) =>
          decodeReferences(line.replace(TAG_PATTERN, ''))
            .replace(/[ \t\r\n]+/g, ' ')
            .trim(),
        )
        .filter((line) => line !== '')
        .join('\n'),
    )
    .filter((paragraph) => paragraph !== '')
    .join('\n\n');
}

// Every placeholder in its own span, in the runs of text between the tags:
// never inside a tag or an attribute value. The brackets stay.
function markPlaceholders(html: string): string {
  return html
    .split(/(<[^>]*>)/)
    .map((part, index) =>
      index % 2 === 1 ? part : part.replace(PLACEHOLDER_PATTERN, (slot) => `<span class="prompt-slot">${slot}</span>`),
    )
    .join('');
}

export interface PromptContent {
  // The prompt to show, as HTML, with every placeholder marked.
  readonly html: string;
  // The prompt as the student copies it.
  readonly text: string;
}

// `html` is what the author wrote between the tags of <Prompt>, rendered.
export function readPrompt(html: string): PromptContent {
  for (const match of html.matchAll(TAG_PATTERN)) {
    const name = (match[1] ?? '').toLowerCase();
    if (!PROMPT_ELEMENTS.has(name)) {
      throw new Error(
        `<Prompt> holds paragraphs of text, with **bold**, *italics* or \`code\` at most, but this one contains ` +
          `<${name}>. The student copies the prompt as plain text, where a list, a heading, an image or a component ` +
          'does not survive. Write each part as a paragraph of its own, with a blank line in between.',
      );
    }
  }
  const text = promptText(html);
  if (text === '') {
    throw new Error(
      '<Prompt> is empty. Put the prompt between its tags: <Prompt>Ik zit in het [jaar en richting]. …</Prompt>.',
    );
  }
  return { html: markPlaceholders(html.trim()), text };
}

// One turn of a <Chat>: who speaks, and what they said as HTML.
export type Speaker = 'jij' | 'ai';

export interface Turn {
  readonly speaker: Speaker;
  readonly html: string;
}

// <Jij> and <AI> render themselves as a JSON script that only <Chat> reads,
// as <Optie> does for <Meerkeuze> (src/components/vragen/authoring.ts):
// <Chat> renders its children to HTML and turns them back into data. `<`
// and `>` are escaped inside the JSON, so the HTML of a turn can never end
// the script early and the pattern below cannot match inside it.
const TURN_PATTERN = /<script\b[^>]*\bdata-beurt\b[^>]*>([^<]*)<\/script>/g;

// `component` is the tag the author wrote ("Jij" or "AI"), for the message.
export function encodeTurn(component: string, speaker: Speaker, html: string): string {
  const trimmed = html.trim();
  if (trimmed === '') {
    throw new Error(`<${component}> is empty. Write the turn between its tags: <${component}>…</${component}>.`);
  }
  const turn: Turn = { speaker, html: trimmed };
  return JSON.stringify(turn).replace(/</g, '\\u003c').replace(/>/g, '\\u003e');
}

// What is left in a <Chat> besides its turns, for the message: its text, or
// its first tag when it has no text.
function excerpt(html: string): string {
  const text = html.replace(TAG_PATTERN, ' ').replace(/\s+/g, ' ').trim();
  if (text === '') return `the element ${html.slice(0, 40)}`;
  return `the text "${text.length > 60 ? `${text.slice(0, 60)}…` : text}"`;
}

const EXAMPLE_CHAT = '<Chat><Jij>Leg fotosynthese uit.</Jij><AI>Fotosynthese is …</AI></Chat>';

// `html` is what the author wrote between the tags of <Chat>, rendered.
export function decodeTurns(html: string): Turn[] {
  if (html.trim() === '') {
    throw new Error(`<Chat> is empty. Write the conversation between its tags, one turn at a time: ${EXAMPLE_CHAT}.`);
  }
  const turns = Array.from(html.matchAll(TURN_PATTERN), (match) => JSON.parse(match[1] ?? '') as Turn);
  // Turns written on one line can end up in a paragraph of their own; that
  // paragraph is not text outside a turn.
  const rest = html.replace(TURN_PATTERN, '').replace(/<\/?p>/g, '').trim();
  if (turns.length === 0) {
    throw new Error(
      `<Chat> has no turns: write every turn as <Jij>…</Jij> or <AI>…</AI>, such as ${EXAMPLE_CHAT}. ` +
        `It now holds ${excerpt(rest)}.`,
    );
  }
  if (rest !== '') {
    throw new Error(
      `<Chat> may only contain <Jij> and <AI> turns, but it also holds ${excerpt(rest)}. ` +
        'Put that inside a turn, or before or after the <Chat>.',
    );
  }
  return turns;
}
