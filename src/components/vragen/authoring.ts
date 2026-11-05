// Build-time checks and plumbing for the Astro wrappers of the question
// components and of <Keuze>. MDX props are not type-checked, so a mistake in
// a module (a missing `id`, a duplicate `id`, a <Meerkeuze> without a right
// answer) fails the build with a clear message instead of reaching a student.

import { decodeReferences } from '../inhoud/authoring';

export interface ChoiceOption {
  // The option's text as HTML: inline Markdown such as **bold** is allowed.
  html: string;
  correct: boolean;
  feedback: string;
}

// One option of a <Keuze>: the key that is stored and that a branch step
// names in `tak`, and the text the student sees.
export interface KeuzeOption {
  key: string;
  label: string;
}

// The format of everything an author names that ends up in a storage key or
// a `data-` attribute: a question `id`, the `naam` of a <Keuze>, its option
// keys, the `tak` of a step.
export const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// The `id` of a question becomes part of its storage key, so it has to be
// stable (written by the author, not a position that shifts when a question
// is inserted) and unique within the module. `locals` is Astro.locals: one
// object per rendered page, shared by every component on it.
export function checkQuestionId(component: string, id: unknown, locals: object): string {
  if (typeof id !== 'string' || !ID_PATTERN.test(id)) {
    throw new Error(
      `<${component}> needs an \`id\` of lowercase letters, digits and hyphens, ` +
        `unique within the module, such as id="prompt-schrijven". Got ${JSON.stringify(id)}.`,
    );
  }
  const registry = locals as { questionIds?: Set<string> };
  registry.questionIds ??= new Set();
  if (registry.questionIds.has(id)) {
    throw new Error(
      `Two questions in this module have id="${id}". Every <Meerkeuze>, <DenkEerst>, <Reflectie>, <Meting>, ` +
        '<Keuzechat>, <Flashcards>, <Meeneemkaart> and <Prompt> with `velden` needs its own id; it is the key under which the answer is stored.',
    );
  }
  registry.questionIds.add(id);
  return id;
}

// The `naam` of a <Keuze> becomes part of its storage key, like the `id` of a
// question, so the same rules apply: stable, and unique among the choices of
// the module.
export function checkChoiceName(name: unknown, locals: object): string {
  if (typeof name !== 'string' || !ID_PATTERN.test(name)) {
    throw new Error(
      '<Keuze> needs a `naam` of lowercase letters, digits and hyphens, unique within the module, ' +
        `such as naam="doel". Got ${JSON.stringify(name)}.`,
    );
  }
  const registry = locals as { choiceNames?: Set<string> };
  registry.choiceNames ??= new Set();
  if (registry.choiceNames.has(name)) {
    throw new Error(
      `Two <Keuze> in this module have naam="${name}". Every <Keuze> needs its own naam; ` +
        'it is the key under which the choice is stored.',
    );
  }
  registry.choiceNames.add(name);
  return name;
}

// `opties` of a <Keuze>: an object of option key → the text the student sees,
// such as opties={{ toets: 'Een schriftelijke toets' }}. One option is
// allowed, so that a branching module can start with one branch.
export function checkChoiceOptions(name: string, options: unknown): KeuzeOption[] {
  const example = "opties={{ toets: 'Een schriftelijke toets', mondeling: 'Een mondeling examen' }}";
  if (typeof options !== 'object' || options === null || Array.isArray(options)) {
    throw new Error(`<Keuze naam="${name}"> needs \`opties\` as an object, such as ${example}.`);
  }
  const entries = Object.entries(options);
  if (entries.length === 0) {
    throw new Error(`<Keuze naam="${name}"> needs at least one option in \`opties\`, such as ${example}.`);
  }
  return entries.map(([key, label]) => {
    if (!ID_PATTERN.test(key)) {
      throw new Error(
        `<Keuze naam="${name}">: the option key "${key}" may only have lowercase letters, digits and hyphens. ` +
          'It is what is stored, and what a branch step names in `tak`.',
      );
    }
    if (typeof label !== 'string' || label.trim() === '') {
      throw new Error(`<Keuze naam="${name}">: option "${key}" needs a non-empty text, such as ${example}.`);
    }
    return { key, label: label.trim() };
  });
}

export function checkText(component: string, name: string, value: unknown): string {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`<${component}> needs a non-empty \`${name}\` attribute.`);
  }
  return value.trim();
}

// `max` of a <Meting>, the top of its score row: 5 unless the author says
// otherwise.
export function checkMeasureMax(id: string, max: unknown): number {
  if (max === undefined) return 5;
  if (!Number.isInteger(max) || (max as number) < 1) {
    throw new Error(
      `<Meting id="${id}">: \`max\` has to be a whole number of 1 or more, such as max={10}. ` +
        `Got ${JSON.stringify(max)}.`,
    );
  }
  return max as number;
}

// <Optie> renders itself as a JSON script that only <Meerkeuze> reads: a
// React island gets its MDX children as finished HTML, not as elements, so
// the wrapper turns them back into data. `<` and `>` are escaped inside the
// JSON, so the HTML of an option can never end the script early and the
// pattern below cannot match inside it.
const OPTION_PATTERN = /<script\b[^>]*\bdata-optie\b[^>]*>([^<]*)<\/script>/g;

export function encodeOption(option: ChoiceOption): string {
  return JSON.stringify(option).replace(/</g, '\\u003c').replace(/>/g, '\\u003e');
}

export function decodeOptions(html: string): ChoiceOption[] {
  const options = Array.from(html.matchAll(OPTION_PATTERN), (match) => {
    return JSON.parse(match[1] ?? '') as ChoiceOption;
  });
  if (html.replace(OPTION_PATTERN, '').trim() !== '') {
    throw new Error('<Meerkeuze> may only contain <Optie> elements, one per answer option.');
  }
  if (options.length < 2) {
    throw new Error('<Meerkeuze> needs at least two <Optie> elements.');
  }
  if (!options.some((option) => option.correct)) {
    throw new Error('<Meerkeuze> needs at least one <Optie juist>.');
  }
  return options;
}

// MDX wraps the text of an element in <p> when the author puts it on its own
// line. An option is a single line of text inside a button, so one wrapping
// paragraph is removed.
export function unwrapParagraph(html: string): string {
  const trimmed = html.trim();
  const inner = /^<p>([^]*)<\/p>$/.exec(trimmed)?.[1];
  return inner !== undefined && !inner.includes('<p>') ? inner : trimmed;
}

// One row of a <Meeneemkaart>: the situation, and the sentence in plain text, as
// it goes into a text field. <Rij> renders itself as a JSON script that only
// <Meeneemkaart> reads, as <Optie> does for <Meerkeuze>.
export interface CardRow {
  situation: string;
  text: string;
}

const ROW_PATTERN = /<script\b[^>]*\bdata-rij\b[^>]*>([^<]*)<\/script>/g;

export function encodeRow(row: CardRow): string {
  return JSON.stringify(row).replace(/</g, '\\u003c').replace(/>/g, '\\u003e');
}

// The text of a <Rij>, which ends up in a text field: markup can not show there.
// So what Markdown turned into markup, such as `2*3*4` or a link, fails the build
// instead of silently losing its stars or its address. Line breaks in the source
// are spaces, as everywhere in Markdown.
export function readRowText(situation: string, html: string): string {
  const inner = unwrapParagraph(html);
  if (/<[a-z!/]/i.test(inner)) {
    throw new Error(
      `<Rij situatie="${situation}"> holds plain text, because it goes into a text field, but Markdown made ` +
        `markup of it: ${inner}. Write it without **, *, \` or a link.`,
    );
  }
  const text = decodeReferences(inner, 'Rij').replace(/\s+/g, ' ').trim();
  if (text === '') {
    throw new Error(
      `<Rij situatie="${situation}"> has no text between its tags. Write the sentence the student starts from: ` +
        '<Rij situatie="Ik zit vast">Geef me één hint, niet de oplossing.</Rij>.',
    );
  }
  return text;
}

export function decodeRows(id: string, html: string): CardRow[] {
  const rows = Array.from(html.matchAll(ROW_PATTERN), (match) => JSON.parse(match[1] ?? '') as CardRow);
  if (html.replace(ROW_PATTERN, '').trim() !== '') {
    throw new Error(`<Meeneemkaart id="${id}"> may only contain <Rij> elements, one per situation.`);
  }
  if (rows.length === 0) {
    throw new Error(
      `<Meeneemkaart id="${id}"> needs at least one <Rij>, such as ` +
        '<Rij situatie="Ik zit vast">Geef me één hint, niet de oplossing.</Rij>.',
    );
  }
  // What the student wrote is stored per situation, so each one is its own.
  const seen = new Set<string>();
  for (const { situation } of rows) {
    if (seen.has(situation)) {
      throw new Error(`<Meeneemkaart id="${id}"> has two <Rij> with situatie="${situation}". Every situation needs its own row.`);
    }
    seen.add(situation);
  }
  return rows;
}
