// Build-time checks on the MDX source of a module, for what no single
// component can check on its own. The module route runs them in
// getStaticPaths, so a mistake fails the build with a clear message instead
// of reaching a student (docs/BRIEFING.md § 12).
//
// Only modules with `status: beschikbaar` are checked, because only they get
// a page. A placeholder with `status: binnenkort` has no steps yet; the
// checks apply as soon as it is switched to `beschikbaar`.

import { ID_PATTERN } from '../vragen/authoring';

// The one branching <Keuze> of a module, as read from the MDX source. The
// route hands it to every <Stap> through Astro.locals, for the label of a
// branch step without JavaScript ("Voor: …"): a step cannot rely on the
// <Keuze> having rendered before it. <Keuze> itself checks that this is
// exactly what its props say.
export interface BranchingChoice {
  readonly name: string;
  // Option key → the text the student sees.
  readonly options: Readonly<Record<string, string>>;
}

export interface ModuleOutline {
  readonly branching: BranchingChoice | null;
}

const EXAMPLE_OPTIONS = "opties={{ toets: 'Een schriftelijke toets', mondeling: 'Een mondeling examen' }}";

// Positions of every match of `pattern` (with the `g` flag) in `text`.
function positions(text: string, pattern: RegExp): number[] {
  return Array.from(text.matchAll(pattern), (match) => match.index);
}

// A small reader for the opening tags of components in MDX source: enough
// for what authors write in a module. What it cannot read fails the build,
// so that a check never passes on a misread tag.

type Attribute =
  // name="…" or name='…'
  | { readonly kind: 'text'; readonly value: string }
  // name={…}, without the outer braces
  | { readonly kind: 'expression'; readonly source: string }
  // name, without a value
  | { readonly kind: 'flag' };

interface Tag {
  readonly index: number;
  readonly attributes: ReadonlyMap<string, Attribute>;
}

interface Cursor {
  readonly text: string;
  at: number;
}

const ATTRIBUTE_NAME = /[A-Za-z_][\w-]*/y;
const IDENTIFIER = /[A-Za-z_$][\w$]*/y;

function skipSpace(cursor: Cursor): void {
  while (/\s/.test(cursor.text.charAt(cursor.at))) cursor.at++;
}

function readMatch(cursor: Cursor, pattern: RegExp): string | null {
  pattern.lastIndex = cursor.at;
  const match = pattern.exec(cursor.text);
  if (match === null) return null;
  cursor.at += match[0].length;
  return match[0];
}

// The index of the quote that closes the JavaScript string opened at `open`,
// or -1.
function endOfString(text: string, open: number): number {
  const quote = text.charAt(open);
  for (let at = open + 1; at < text.length; at++) {
    const char = text.charAt(at);
    if (char === '\\') at++;
    else if (char === quote) return at;
  }
  return -1;
}

// The index just after the brace that closes the one at `open`, or -1.
// Braces inside strings do not count.
function endOfExpression(text: string, open: number): number {
  let depth = 0;
  for (let at = open; at < text.length; at++) {
    const char = text.charAt(at);
    if (char === '"' || char === "'" || char === '`') {
      at = endOfString(text, at);
      if (at < 0) return -1;
    } else if (char === '{') {
      depth++;
    } else if (char === '}') {
      depth--;
      if (depth === 0) return at + 1;
    }
  }
  return -1;
}

function readAttributes(id: string, component: string, cursor: Cursor): Map<string, Attribute> {
  const start = cursor.at;
  const fail = (problem: string): Error => {
    const excerpt = cursor.text.slice(start, start + 60).replace(/\s+/g, ' ');
    return new Error(`Module "${id}": cannot read the tag <${component}${excerpt}…: ${problem}.`);
  };
  const attributes = new Map<string, Attribute>();
  for (;;) {
    skipSpace(cursor);
    const char = cursor.text.charAt(cursor.at);
    if (char === '') throw fail('it is never closed');
    if (char === '>' || cursor.text.startsWith('/>', cursor.at)) return attributes;
    const name = readMatch(cursor, ATTRIBUTE_NAME);
    if (name === null) throw fail(`unexpected "${char}"`);
    if (attributes.has(name)) throw fail(`\`${name}\` appears twice`);
    skipSpace(cursor);
    if (cursor.text.charAt(cursor.at) !== '=') {
      attributes.set(name, { kind: 'flag' });
      continue;
    }
    cursor.at++;
    skipSpace(cursor);
    const open = cursor.text.charAt(cursor.at);
    if (open === '"' || open === "'") {
      // JSX strings have no escapes: the value ends at the next same quote.
      const end = cursor.text.indexOf(open, cursor.at + 1);
      if (end < 0) throw fail(`the value of \`${name}\` is never closed`);
      attributes.set(name, { kind: 'text', value: cursor.text.slice(cursor.at + 1, end) });
      cursor.at = end + 1;
    } else if (open === '{') {
      const end = endOfExpression(cursor.text, cursor.at);
      if (end < 0) throw fail(`the value of \`${name}\` is never closed`);
      attributes.set(name, { kind: 'expression', source: cursor.text.slice(cursor.at + 1, end - 1) });
      cursor.at = end;
    } else {
      throw fail(`the value of \`${name}\` is neither "…" nor {…}`);
    }
  }
}

// Every opening tag of `component` in the source, in order.
function tagsOf(id: string, body: string, component: string): Tag[] {
  return Array.from(body.matchAll(new RegExp(`<${component}(?=[\\s/>])`, 'g')), (match) => ({
    index: match.index,
    attributes: readAttributes(id, component, { text: body, at: match.index + match[0].length }),
  }));
}

function textOf(tag: Tag, name: string): string | undefined {
  const attribute = tag.attributes.get(name);
  return attribute?.kind === 'text' ? attribute.value : undefined;
}

// A JavaScript string in single or double quotes, with only \\, \' and \" as
// escapes; null for anything else.
function readString(cursor: Cursor): string | null {
  const quote = cursor.text.charAt(cursor.at);
  if (quote !== '"' && quote !== "'") return null;
  let value = '';
  for (let at = cursor.at + 1; at < cursor.text.length; at++) {
    const char = cursor.text.charAt(at);
    if (char === quote) {
      cursor.at = at + 1;
      return value;
    }
    if (char === '\n') return null;
    if (char === '\\') {
      const next = cursor.text.charAt(at + 1);
      if (next !== '\\' && next !== '"' && next !== "'") return null;
      value += next;
      at++;
    } else {
      value += char;
    }
  }
  return null;
}

// `opties` of the branching <Keuze>, read from the source. Only an object of
// plain texts, `{ toets: 'Een toets', 'met-koppelteken': "Een tekst" }`:
// anything else (a variable, a template, a computed text) could differ from
// what <Keuze> renders, so it fails the build instead.
function readOptions(id: string, name: string, attribute: Attribute | undefined): Record<string, string> {
  const fail = (): Error =>
    new Error(
      `Module "${id}": write \`opties\` of <Keuze naam="${name}" vertakt> as an object of plain texts, ` +
        `such as ${EXAMPLE_OPTIONS}. The build reads it from the source, so a variable or a computed text ` +
        'does not work there.',
    );
  if (attribute?.kind !== 'expression') throw fail();
  const cursor: Cursor = { text: attribute.source.trim(), at: 1 };
  if (!cursor.text.startsWith('{') || !cursor.text.endsWith('}')) throw fail();
  const end = cursor.text.length - 1;
  const options: Record<string, string> = {};
  for (;;) {
    skipSpace(cursor);
    if (cursor.at === end) return options;
    const key = readMatch(cursor, IDENTIFIER) ?? readString(cursor);
    if (key === null) throw fail();
    if (!ID_PATTERN.test(key)) {
      throw new Error(
        `Module "${id}": the option key "${key}" of <Keuze naam="${name}"> may only have lowercase letters, ` +
          'digits and hyphens.',
      );
    }
    if (Object.hasOwn(options, key)) {
      throw new Error(`Module "${id}": <Keuze naam="${name}"> has the option "${key}" twice.`);
    }
    skipSpace(cursor);
    if (cursor.text.charAt(cursor.at) !== ':') throw fail();
    cursor.at++;
    skipSpace(cursor);
    const label = readString(cursor);
    if (label === null) throw fail();
    options[key] = label.trim();
    skipSpace(cursor);
    if (cursor.text.charAt(cursor.at) === ',') cursor.at++;
    else if (cursor.at !== end) throw fail();
  }
}

// `vertakt` is a flag: <Keuze naam="doel" vertakt …>.
function isBranching(id: string, tag: Tag): boolean {
  const attribute = tag.attributes.get('vertakt');
  if (attribute === undefined) return false;
  if (attribute.kind === 'flag') return true;
  if (attribute.kind === 'expression' && attribute.source.trim() === 'true') return true;
  throw new Error(
    `Module "${id}": write \`vertakt\` on <Keuze naam="${textOf(tag, 'naam') ?? '…'}"> without a value, ` +
      'or leave it out for a choice that does not branch.',
  );
}

export function checkModuleBody(id: string, body: string): ModuleOutline {
  // A module is a series of steps (BRIEFING § 6); without any the player
  // has nothing to show.
  const steps = tagsOf(id, body, 'Stap');
  if (steps.length === 0) {
    throw new Error(`Module "${id}" has no <Stap> blocks.`);
  }

  // The summary collects the answers of the whole module and ends it: once,
  // in the last step (BRIEFING § 12). Text after the last <Stap> does not
  // belong in a module at all, so "after the last <Stap>" means "in it".
  const summaries = positions(body, /<Samenvatting[\s/>]/g);
  if (summaries.length > 1) {
    throw new Error(`Module "${id}" has ${summaries.length} <Samenvatting /> components; it may have one.`);
  }
  const summary = summaries[0];
  const lastStep = steps[steps.length - 1];
  if (summary !== undefined && lastStep !== undefined) {
    if (summary < lastStep.index) {
      throw new Error(`Module "${id}": <Samenvatting /> belongs in the last <Stap> of the module.`);
    }
    // Every student has to reach it, whatever they chose.
    const tak = textOf(lastStep, 'tak');
    if (tak !== undefined) {
      throw new Error(
        `Module "${id}": the last <Stap>, with <Samenvatting />, has tak="${tak}", so only that branch would ` +
          'see it. The last step is shared: remove its `tak`.',
      );
    }
  }

  // Branches (BRIEFING § 12, "Keuzes en takken"): one branching <Keuze> at
  // most, in a shared step; every branch step after it names one of its
  // options; every option has steps.
  const branchingTags = tagsOf(id, body, 'Keuze').filter((tag) => isBranching(id, tag));
  if (branchingTags.length > 1) {
    const names = branchingTags.map((tag) => `"${textOf(tag, 'naam') ?? '…'}"`).join(', ');
    throw new Error(
      `Module "${id}" has ${branchingTags.length} <Keuze> with \`vertakt\` (${names}); a module branches at most ` +
        'once. Leave `vertakt` off the choices that only ask something.',
    );
  }
  const choiceTag = branchingTags[0];
  let branching: BranchingChoice | null = null;
  if (choiceTag !== undefined) {
    const name = textOf(choiceTag, 'naam');
    if (name === undefined) {
      throw new Error(`Module "${id}": the branching <Keuze> needs a \`naam\` as text, such as naam="doel".`);
    }
    branching = { name, options: readOptions(id, name, choiceTag.attributes.get('opties')) };
  }
  // The step that holds the branching choice: the last one that opens before it.
  const choiceStep = choiceTag === undefined ? undefined : steps.filter((step) => step.index < choiceTag.index).at(-1);

  const stepsPerOption = new Map<string, number>();
  for (const step of steps) {
    const attribute = step.attributes.get('tak');
    if (attribute === undefined) continue;
    const title = textOf(step, 'titel') ?? '…';
    if (attribute.kind !== 'text') {
      throw new Error(`Module "${id}": write \`tak\` of <Stap titel="${title}"> as text, such as tak="toets".`);
    }
    const tak = attribute.value;
    if (branching === null || choiceTag === undefined || step.index < choiceTag.index) {
      if (step === choiceStep && branching !== null) {
        throw new Error(
          `Module "${id}": <Stap titel="${title}" tak="${tak}"> holds the branching <Keuze naam="${branching.name}">, ` +
            'so it is shared by every branch: remove its `tak`.',
        );
      }
      throw new Error(
        `Module "${id}": <Stap titel="${title}" tak="${tak}"> belongs to a branch, but there is no ` +
          '<Keuze … vertakt> before it. Put the branching choice in a shared step (without `tak`) before the ' +
          'first branch step.',
      );
    }
    if (!Object.hasOwn(branching.options, tak)) {
      throw new Error(
        `Module "${id}": <Stap titel="${title}" tak="${tak}">: "${tak}" is not an option of ` +
          `<Keuze naam="${branching.name}" vertakt>. Its options are: ${Object.keys(branching.options).join(', ')}.`,
      );
    }
    stepsPerOption.set(tak, (stepsPerOption.get(tak) ?? 0) + 1);
  }
  if (branching !== null) {
    for (const key of Object.keys(branching.options)) {
      if (!stepsPerOption.has(key)) {
        throw new Error(
          `Module "${id}": option "${key}" of <Keuze naam="${branching.name}" vertakt> has no steps. Add at least ` +
            `one <Stap titel="…" tak="${key}"> after the choice, or leave the option out until its steps are there.`,
        );
      }
    }
  }

  return { branching };
}
