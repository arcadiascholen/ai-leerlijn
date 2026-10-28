// Build-time plumbing for the content components in this folder
// (docs/BRIEFING.md § 12, "Prompts en gesprekken"): <Prompt>, with or
// without fields, and <Chat> with its turns <Jij> and <AI>. MDX children and
// props are not type-checked, so a mistake in a module (an empty prompt, a
// field without its placeholder, text outside a turn) fails the build with a
// clear message instead of reaching a student.

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

// Calls `replace` for every placeholder in the runs of text between the
// tags: never inside a tag or an attribute value.
function eachPlaceholder(html: string, replace: (slot: string) => string): string {
  return html
    .split(/(<[^>]*>)/)
    .map((part, index) => (index % 2 === 1 ? part : part.replace(PLACEHOLDER_PATTERN, replace)))
    .join('');
}

// The name of a placeholder in rendered HTML, such as `[mijn uitleg]`: what
// is between the brackets, as plain text, with white space as Markdown shows
// it. A field in `velden` names its placeholder this way.
function placeholderName(slot: string): string {
  return decodeReferences(slot.slice(1, -1))
    .replace(/[ \t\r\n]+/g, ' ')
    .trim();
}

function escapeAttribute(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Every placeholder in its own span. The brackets stay. A placeholder that a
// field fills in also carries the name of that field.
function markPlaceholders(html: string, fields: ReadonlySet<string> | null): string {
  return eachPlaceholder(html, (slot) => {
    if (fields !== null) {
      const name = placeholderName(slot);
      if (fields.has(name)) return `<span class="prompt-slot" data-prompt-slot="${escapeAttribute(name)}">${slot}</span>`;
    }
    return `<span class="prompt-slot">${slot}</span>`;
  });
}

// A field of a <Prompt>: the name of the placeholder it fills in, and the
// label above its text field, which the summary shows too.
export interface PromptField {
  readonly name: string;
  readonly label: string;
}

const EXAMPLE_FIELDS = "velden={{ begrip: 'Begrip', 'mijn uitleg': 'Mijn uitleg' }}";

// `velden` of a <Prompt>: an object of placeholder name → the label of its
// field, in plain texts.
export function checkPromptFields(fields: unknown): PromptField[] {
  if (
    typeof fields !== 'object' ||
    fields === null ||
    Array.isArray(fields) ||
    Object.getPrototypeOf(fields) !== Object.prototype
  ) {
    throw new Error(
      `<Prompt> needs \`velden\` as an object of placeholder name → label, such as ${EXAMPLE_FIELDS}. ` +
        `Got ${JSON.stringify(fields)}.`,
    );
  }
  const entries = Object.entries(fields);
  if (entries.length === 0) {
    throw new Error(`<Prompt> has no fields in \`velden\`: name at least one placeholder, such as ${EXAMPLE_FIELDS}.`);
  }
  return entries.map(([name, label]) => {
    if (typeof label !== 'string') {
      throw new Error(
        `<Prompt>: the label of the field "${name}" in \`velden\` is not a text. Write every label between quotes, ` +
          `such as ${EXAMPLE_FIELDS}.`,
      );
    }
    if (label.trim() === '') {
      throw new Error(
        `<Prompt>: the field "${name}" in \`velden\` has an empty label. The label stands above the field and in ` +
          "the summary: write a noun, such as 'Mijn uitleg'.",
      );
    }
    return { name, label: label.trim() };
  });
}

// The copied text of a prompt with fields, cut at the placeholders of its
// fields: the plain text in between, and per placeholder the field that
// fills it in and what stands there while that field is empty.
export type PromptPart = string | { readonly field: string; readonly empty: string };

// The build marks every placeholder of a field with characters that a
// module does not use, derives the plain text as for any prompt, and cuts it
// at those marks. So the paragraphs and the white space of the copied text
// follow the same rules with fields as without.
const FIELD_MARK = /\uE000(\d+)\uE001/;

function promptTemplate(html: string, fields: ReadonlySet<string>): PromptPart[] {
  if (/[\uE000\uE001]/.test(html)) {
    throw new Error('<Prompt> contains a character from the Unicode private use area (U+E000 or U+E001).');
  }
  const slots: { readonly field: string; readonly empty: string }[] = [];
  const marked = eachPlaceholder(html, (slot) => {
    const name = placeholderName(slot);
    if (!fields.has(name)) return slot;
    // As promptText writes it: plain text, every run of white space one space.
    slots.push({ field: name, empty: decodeReferences(slot).replace(/[ \t\r\n]+/g, ' ') });
    return `\uE000${slots.length - 1}\uE001`;
  });
  return promptText(marked)
    .split(FIELD_MARK)
    .flatMap((part, index): PromptPart[] => {
      if (index % 2 === 0) return part === '' ? [] : [part];
      const slot = slots[Number(part)];
      if (slot === undefined) throw new Error('<Prompt>: lost track of a placeholder.');
      return [slot];
    });
}

export interface PromptContent {
  // The prompt to show, as HTML, with every placeholder marked.
  readonly html: string;
  // The prompt as the student copies it; with fields, while they are empty.
  readonly text: string;
  // Only for a prompt with fields: `text` cut at their placeholders.
  readonly template: readonly PromptPart[] | null;
}

// A <Prompt> with fields: its `id`, for the messages, and its fields.
export interface PromptFieldsOptions {
  readonly id: string;
  readonly fields: readonly PromptField[];
}

// `html` is what the author wrote between the tags of <Prompt>, rendered.
export function readPrompt(html: string, options: PromptFieldsOptions | null = null): PromptContent {
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
  if (options === null) return { html: markPlaceholders(html.trim(), null), text, template: null };

  // Every field fills in a placeholder of the prompt. A field without one
  // would fill in nothing, and what the student wrote would not be copied.
  const placeholders = new Set<string>();
  eachPlaceholder(html, (slot) => {
    placeholders.add(placeholderName(slot));
    return slot;
  });
  for (const field of options.fields) {
    if (placeholders.has(field.name)) continue;
    const found =
      placeholders.size === 0
        ? 'The prompt has no placeholders.'
        : `Its placeholders are: ${Array.from(placeholders, (name) => `[${name}]`).join(', ')}.`;
    throw new Error(
      `<Prompt id="${options.id}">: "${field.name}" in \`velden\` is not a placeholder in the prompt. ${found} ` +
        `A field fills in the placeholder with its name between square brackets, such as [${field.name}]: add it ` +
        'to the prompt, or correct the name in `velden`.',
    );
  }
  const names = new Set(options.fields.map((field) => field.name));
  const template = promptTemplate(html, names);
  // With every field empty, the prompt copies exactly what it shows.
  if (template.map((part) => (typeof part === 'string' ? part : part.empty)).join('') !== text) {
    throw new Error(`<Prompt id="${options.id}">: the fields do not line up with the copied text of the prompt.`);
  }
  return { html: markPlaceholders(html.trim(), names), text, template };
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
