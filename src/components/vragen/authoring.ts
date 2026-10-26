// Build-time checks and plumbing for the Astro wrappers of the question
// components. MDX props are not type-checked, so a mistake in a module
// (a missing `id`, a duplicate `id`, a <Meerkeuze> without a right answer)
// fails the build with a clear message instead of reaching a student.

export interface ChoiceOption {
  // The option's text as HTML: inline Markdown such as **bold** is allowed.
  html: string;
  correct: boolean;
  feedback: string;
}

const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

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
      `Two questions in this module have id="${id}". Every <Meerkeuze>, <DenkEerst> and <Reflectie> ` +
        'needs its own id; it is the key under which the answer is stored.',
    );
  }
  registry.questionIds.add(id);
  return id;
}

export function checkText(component: string, name: string, value: unknown): string {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`<${component}> needs a non-empty \`${name}\` attribute.`);
  }
  return value.trim();
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
