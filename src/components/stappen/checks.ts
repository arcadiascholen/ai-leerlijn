// Build-time checks on the MDX source of a module, for what no single
// component can check on its own. The module route runs them in
// getStaticPaths, so a mistake fails the build with a clear message instead
// of reaching a student (docs/BRIEFING.md § 12).
//
// Only modules with `status: beschikbaar` are checked, because only they get
// a page. A placeholder with `status: binnenkort` has no steps yet; the
// checks apply as soon as it is switched to `beschikbaar`.

import { ID_PATTERN } from '../vragen/authoring';
import { MAX_CARDS, parseDeck } from '../vragen/flashcards';
import { TOOL_CHOICE } from './tools';

// A <Keuze> as read from the MDX source: its `naam` and its options. The
// route hands the choices that other components need at build time to them
// through Astro.locals: a component in another step cannot rely on the
// <Keuze> having rendered before it. <Keuze> itself checks that this is
// exactly what its props say.
export interface SourceChoice {
  readonly name: string;
  // Option key → the text the student sees.
  readonly options: Readonly<Record<string, string>>;
}

export interface ModuleOutline {
  // The one branching <Keuze>, for the label of a branch step without
  // JavaScript ("Voor: …", Stap.astro).
  readonly branching: SourceChoice | null;
  // The <Keuze naam="tool">, for the label of a <Tool> block ("In ChatGPT",
  // Tool.astro) and the rules that show the blocks of the chosen tool
  // (ChosenTool.astro).
  readonly tool: SourceChoice | null;
  // Per <Prompt> with `velden`: its `id` → the title of the step it is in,
  // which the summary shows as the question above the fields (Prompt.astro).
  readonly promptSteps: Readonly<Record<string, string>>;
  // Per <Reflectie> that a <Prompt> takes over with `overnemen`: its `id` →
  // the title of the step it is in, which the prompt names while the answer
  // is empty (Prompt.astro).
  readonly sourceSteps: Readonly<Record<string, string>>;
  // Per <Keuzechat>: its `id` → the title of the step it is in, which its
  // answer stores as the question (Keuzechat.astro).
  readonly choiceChatSteps: Readonly<Record<string, string>>;
  // Per <Flashcards>: its `id` → the example deck between its tags, as lines of
  // source; '' without one (Flashcards.astro).
  readonly flashcardDecks: Readonly<Record<string, string>>;
}

const EXAMPLE_OPTIONS = "opties={{ toets: 'Een schriftelijke toets', mondeling: 'Een mondeling examen' }}";
const EXAMPLE_TOOL_OPTIONS = "opties={{ chatgpt: 'ChatGPT', gemini: 'Gemini' }}";

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
  // Just after the `>` or `/>` that closes the opening tag.
  readonly end: number;
  readonly selfClosing: boolean;
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
  return Array.from(body.matchAll(new RegExp(`<${component}(?=[\\s/>])`, 'g')), (match) => {
    const cursor: Cursor = { text: body, at: match.index + match[0].length };
    const attributes = readAttributes(id, component, cursor);
    const selfClosing = body.startsWith('/>', cursor.at);
    return { index: match.index, end: cursor.at + (selfClosing ? 2 : 1), selfClosing, attributes };
  });
}

// Where every element of `component` sits in the source: from its opening
// tag to the end of its closing tag. No nesting of the same component.
function spansOf(id: string, body: string, component: string): (readonly [start: number, end: number])[] {
  return tagsOf(id, body, component).map((tag) => {
    if (tag.selfClosing) return [tag.index, tag.end] as const;
    const closing = new RegExp(`</${component}\\s*>`, 'g');
    closing.lastIndex = tag.end;
    const match = closing.exec(body);
    return [tag.index, match === null ? body.length : match.index + match[0].length] as const;
  });
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

// An object of plain texts, read from the source, such as
// `{ toets: 'Een toets', 'met spatie': "Een tekst" }`: anything else (a
// variable, a template, a computed text) could differ from what the component
// renders, so `fail` fails the build instead. `checkKey` sees every key, with
// the texts read so far, before its text is read.
function readTexts(
  attribute: Attribute | undefined,
  fail: () => Error,
  checkKey: (key: string, texts: Readonly<Record<string, string>>) => void,
): Record<string, string> {
  if (attribute?.kind !== 'expression') throw fail();
  const cursor: Cursor = { text: attribute.source.trim(), at: 1 };
  if (!cursor.text.startsWith('{') || !cursor.text.endsWith('}')) throw fail();
  const end = cursor.text.length - 1;
  const texts: Record<string, string> = {};
  for (;;) {
    skipSpace(cursor);
    if (cursor.at === end) return texts;
    const key = readMatch(cursor, IDENTIFIER) ?? readString(cursor);
    if (key === null) throw fail();
    checkKey(key, texts);
    skipSpace(cursor);
    if (cursor.text.charAt(cursor.at) !== ':') throw fail();
    cursor.at++;
    skipSpace(cursor);
    const text = readString(cursor);
    if (text === null) throw fail();
    texts[key] = text.trim();
    skipSpace(cursor);
    if (cursor.text.charAt(cursor.at) === ',') cursor.at++;
    else if (cursor.at !== end) throw fail();
  }
}

// `opties` of a <Keuze>. `tag` names the <Keuze> in the messages; `example` is
// a valid `opties` for it.
function readOptions(
  id: string,
  tag: string,
  example: string,
  attribute: Attribute | undefined,
): Record<string, string> {
  const fail = (): Error =>
    new Error(
      `Module "${id}": write \`opties\` of ${tag} as an object of plain texts, ` +
        `such as ${example}. The build reads it from the source, so a variable or a computed text ` +
        'does not work there.',
    );
  return readTexts(attribute, fail, (key, options) => {
    if (!ID_PATTERN.test(key)) {
      throw new Error(
        `Module "${id}": the option key "${key}" of ${tag} may only have lowercase letters, ` +
          'digits and hyphens.',
      );
    }
    if (Object.hasOwn(options, key)) {
      throw new Error(`Module "${id}": ${tag} has the option "${key}" twice.`);
    }
  });
}

const EXAMPLE_SOURCES = "overnemen={{ 'mijn argumenten': 'debat-argumenten' }}";

// `overnemen` of a <Prompt>: placeholder name → the `id` of a <Reflectie>. A
// key is the name of a placeholder, so unlike an option key it may hold
// spaces. `prompt` names the <Prompt> in the messages.
function readSources(id: string, prompt: string, attribute: Attribute | undefined): Record<string, string> {
  const fail = (): Error =>
    new Error(
      `Module "${id}": write \`overnemen\` of ${prompt} as an object of plain texts, such as ${EXAMPLE_SOURCES}. ` +
        'The build reads it from the source, so a variable or a computed text does not work there.',
    );
  const sources = readTexts(attribute, fail, (key, texts) => {
    if (Object.hasOwn(texts, key)) {
      throw new Error(`Module "${id}": ${prompt} has "${key}" twice in \`overnemen\`.`);
    }
  });
  if (Object.keys(sources).length === 0) {
    throw new Error(`Module "${id}": ${prompt} has nothing in \`overnemen\`: name a placeholder, such as ${EXAMPLE_SOURCES}.`);
  }
  return sources;
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

  // Confetti plays once per module (BRIEFING § 12, "Confetti"), and it is
  // stored per module: a second one would never play.
  const confetti = positions(body, /<Confetti[\s/>]/g);
  if (confetti.length > 1) {
    throw new Error(
      `Module "${id}" has ${confetti.length} <Confetti /> components; it may have one. Confetti plays once per ` +
        'module: keep it in the step where it matters most.',
    );
  }

  // Branches (BRIEFING § 12, "Keuzes en takken"): one branching <Keuze> at
  // most, in a shared step; every branch step after it names one of its
  // options; every option has steps.
  const choiceTags = tagsOf(id, body, 'Keuze');
  const branchingTags = choiceTags.filter((tag) => isBranching(id, tag));
  if (branchingTags.length > 1) {
    const names = branchingTags.map((tag) => `"${textOf(tag, 'naam') ?? '…'}"`).join(', ');
    throw new Error(
      `Module "${id}" has ${branchingTags.length} <Keuze> with \`vertakt\` (${names}); a module branches at most ` +
        'once. Leave `vertakt` off the choices that only ask something.',
    );
  }
  const choiceTag = branchingTags[0];
  let branching: SourceChoice | null = null;
  if (choiceTag !== undefined) {
    const name = textOf(choiceTag, 'naam');
    if (name === undefined) {
      throw new Error(`Module "${id}": the branching <Keuze> needs a \`naam\` as text, such as naam="doel".`);
    }
    branching = {
      name,
      options: readOptions(id, `<Keuze naam="${name}" vertakt>`, EXAMPLE_OPTIONS, choiceTag.attributes.get('opties')),
    };
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

  // Instructions per tool (BRIEFING § 12, "Instructies per tool"): at most
  // one <Keuze naam="tool">, and every <Tool> comes after it and names one
  // of its options.
  const toolChoiceTags = choiceTags.filter((tag) => textOf(tag, 'naam') === TOOL_CHOICE);
  if (toolChoiceTags.length > 1) {
    throw new Error(
      `Module "${id}" has ${toolChoiceTags.length} <Keuze naam="${TOOL_CHOICE}">. Ask for the tool once; every ` +
        '<Tool> after it follows that choice.',
    );
  }
  const toolChoiceTag = toolChoiceTags[0];
  let tool: SourceChoice | null = null;
  if (toolChoiceTag !== undefined) {
    tool = {
      name: TOOL_CHOICE,
      options: readOptions(
        id,
        `<Keuze naam="${TOOL_CHOICE}">`,
        EXAMPLE_TOOL_OPTIONS,
        toolChoiceTag.attributes.get('opties'),
      ),
    };
  }
  for (const tag of tagsOf(id, body, 'Tool')) {
    const attribute = tag.attributes.get('naam');
    if (attribute?.kind !== 'text') {
      throw new Error(`Module "${id}": write \`naam\` of every <Tool> as text, such as <Tool naam="chatgpt">.`);
    }
    const name = attribute.value;
    if (tool === null || toolChoiceTag === undefined) {
      throw new Error(
        `Module "${id}": <Tool naam="${name}"> shows instructions for the tool the student chose, but the module ` +
          `has no <Keuze naam="${TOOL_CHOICE}">. Ask for the tool in a step before the first <Tool>, such as ` +
          `<Keuze naam="${TOOL_CHOICE}" vraag="Met welke tool werk je vandaag?" ${EXAMPLE_TOOL_OPTIONS} />.`,
      );
    }
    if (tag.index < toolChoiceTag.index) {
      throw new Error(
        `Module "${id}": <Tool naam="${name}"> comes before <Keuze naam="${TOOL_CHOICE}">, so the student has not ` +
          'chosen a tool there yet. Move the choice to a step before the first <Tool>.',
      );
    }
    if (!Object.hasOwn(tool.options, name)) {
      throw new Error(
        `Module "${id}": <Tool naam="${name}">: "${name}" is not an option of <Keuze naam="${TOOL_CHOICE}">. ` +
          `Its options are: ${Object.keys(tool.options).join(', ')}.`,
      );
    }
  }

  // Conversations (BRIEFING § 12, "Prompts en gesprekken"): a turn only
  // means something inside a <Chat> or a <Keuzechat>. They check what is inside
  // them from their rendered children; a turn outside them they cannot see, and
  // that turn would silently disappear from the page.
  const choiceChats = spansOf(id, body, 'Keuzechat');
  const rounds = spansOf(id, body, 'Ronde');
  const chats = [...spansOf(id, body, 'Chat'), ...choiceChats];
  const isIn = (spans: readonly (readonly [number, number])[], tag: Tag): boolean =>
    spans.some(([start, end]) => tag.index > start && tag.index < end);
  for (const component of ['Jij', 'AI']) {
    for (const tag of tagsOf(id, body, component)) {
      if (isIn(chats, tag)) continue;
      const step = steps.filter((candidate) => candidate.index < tag.index).at(-1);
      const where = step === undefined ? '' : ` in <Stap titel="${textOf(step, 'titel') ?? '…'}">`;
      throw new Error(
        `Module "${id}": <${component}>${where} is a turn of a conversation and only works inside a <Chat> or a ` +
          '<Keuzechat>, such as <Chat><Jij>Leg fotosynthese uit.</Jij><AI>Fotosynthese is …</AI></Chat>.',
      );
    }
  }

  // A conversation in which the student chooses the next message (BRIEFING
  // § 12, "Prompts en gesprekken"). A <Ronde> or <Bericht> in the wrong place
  // would silently disappear from the page, as a turn would. The answer stores
  // the title of the step as its question, and a component cannot read that
  // title, so the build reads it here.
  const whereIs = (tag: Tag): string => {
    const step = steps.filter((candidate) => candidate.index < tag.index).at(-1);
    return step === undefined ? '' : ` in <Stap titel="${textOf(step, 'titel') ?? '…'}">`;
  };
  for (const tag of tagsOf(id, body, 'Ronde')) {
    if (isIn(choiceChats, tag)) continue;
    throw new Error(
      `Module "${id}": <Ronde>${whereIs(tag)} is a round of a conversation and only works inside a <Keuzechat>, ` +
        'such as <Keuzechat id="bijsturen"><Jij>…</Jij><AI>…</AI><Ronde vraag="Wat typ je nu?">…</Ronde></Keuzechat>.',
    );
  }
  for (const tag of tagsOf(id, body, 'Bericht')) {
    if (isIn(rounds, tag) && isIn(choiceChats, tag)) continue;
    throw new Error(
      `Module "${id}": <Bericht>${whereIs(tag)} is a message to choose and only works inside a <Ronde> of a ` +
        '<Keuzechat>, such as <Ronde vraag="Wat typ je nu?"><Bericht goed reactie="…" feedback="…">…</Bericht>…</Ronde>.',
    );
  }
  // A row of a card (BRIEFING § 12, "Vraagtypes"): outside a <Meeneemkaart> it
  // would silently disappear from the page, as a turn would. <Meeneemkaart> checks
  // the rows inside it.
  const cards = spansOf(id, body, 'Meeneemkaart');
  for (const tag of tagsOf(id, body, 'Rij')) {
    if (isIn(cards, tag)) continue;
    throw new Error(
      `Module "${id}": <Rij>${whereIs(tag)} is a row of a card and only works inside a <Meeneemkaart>, such as ` +
        '<Meeneemkaart><Rij situatie="Context helpt">Geef AI je cursus, desnoods als afbeelding.</Rij></Meeneemkaart>.',
    );
  }
  const choiceChatSteps: Record<string, string> = {};
  for (const tag of tagsOf(id, body, 'Keuzechat')) {
    const step = steps.filter((candidate) => candidate.index < tag.index).at(-1);
    const title = step === undefined ? undefined : textOf(step, 'titel');
    const chatId = textOf(tag, 'id');
    if (chatId === undefined) {
      throw new Error(
        `Module "${id}": the <Keuzechat>${whereIs(tag)} needs an \`id\` as text, such as <Keuzechat id="bijsturen">. ` +
          'What the student chooses is stored under it: lowercase letters, digits and hyphens, unique among the ' +
          'questions of the module.',
      );
    }
    if (title === undefined) {
      throw new Error(
        `Module "${id}": <Keuzechat id="${chatId}"> belongs in a <Stap> whose \`titel\` is written as text: the ` +
          'timeline in the summary shows that title.',
      );
    }
    choiceChatSteps[chatId] = title;
  }

  // Prompts with fields (BRIEFING § 12, "Prompts en gesprekken"): what the
  // student writes in them is stored under the `id` of the prompt, and the
  // summary shows it under the title of its step. A component cannot read
  // the title of the step it renders in, so the build reads it here.
  const promptSteps: Record<string, string> = {};
  for (const tag of tagsOf(id, body, 'Prompt')) {
    if (!tag.attributes.has('velden')) continue;
    const step = steps.filter((candidate) => candidate.index < tag.index).at(-1);
    const title = step === undefined ? undefined : textOf(step, 'titel');
    const where = step === undefined ? '' : ` in <Stap titel="${title ?? '…'}">`;
    const promptId = textOf(tag, 'id');
    if (promptId === undefined) {
      throw new Error(
        `Module "${id}": the <Prompt> with \`velden\`${where} needs an \`id\` as text, such as ` +
          '<Prompt id="uitleg-begrip" velden={…}>. What the student writes in the fields is stored under it, as ' +
          'the answer to a question: lowercase letters, digits and hyphens, unique among the questions of the module.',
      );
    }
    if (title === undefined) {
      throw new Error(
        `Module "${id}": <Prompt id="${promptId}"> with \`velden\` belongs in a <Stap> whose \`titel\` is written ` +
          'as text: the summary shows that title as the question above the fields.',
      );
    }
    promptSteps[promptId] = title;
  }

  const stepOf = (tag: Tag): Tag | undefined => steps.filter((candidate) => candidate.index < tag.index).at(-1);
  const describe = (step: Tag | undefined): string => {
    if (step === undefined) return 'no <Stap>';
    const tak = textOf(step, 'tak');
    return `<Stap titel="${textOf(step, 'titel') ?? '…'}"${tak === undefined ? '' : ` tak="${tak}"`}>`;
  };
  // Every component that stores an answer under an `id`.
  const questionTags = (): { component: string; tag: Tag }[] =>
    ['Reflectie', 'Meerkeuze', 'DenkEerst', 'Prompt', 'Meting', 'Keuzechat', 'Flashcards'].flatMap((component) =>
      tagsOf(id, body, component).map((tag) => ({ component, tag })),
    );

  // Prompts that take over an answer (BRIEFING § 12, "Prompts en gesprekken"):
  // the source is a <Reflectie> that every student who sees the prompt has
  // already had in front of them. While it is empty, the prompt names the step
  // it is in; a component cannot read that title, so the build reads it here.
  const sourceSteps: Record<string, string> = {};
  const takingOver = tagsOf(id, body, 'Prompt').filter((tag) => tag.attributes.has('overnemen'));
  if (takingOver.length > 0) {
    const questions = questionTags();
    for (const prompt of takingOver) {
      const promptStep = stepOf(prompt);
      const where = `the <Prompt> in ${describe(promptStep)}`;
      const sources = readSources(id, where, prompt.attributes.get('overnemen'));
      for (const [name, sourceId] of Object.entries(sources)) {
        const start = `Module "${id}": ${where} takes over [${name}] from "${sourceId}"`;
        const question = questions.find(({ tag }) => textOf(tag, 'id') === sourceId);
        if (question === undefined) {
          throw new Error(
            `${start}, but no question in this module has that \`id\`. Write the \`id\` of a <Reflectie> earlier ` +
              'in the module.',
          );
        }
        if (question.component !== 'Reflectie') {
          throw new Error(
            `${start}, but that is a <${question.component}>. Only the answer to a <Reflectie> can be taken over.`,
          );
        }
        const sourceStep = stepOf(question.tag);
        const sourceTak = sourceStep === undefined ? undefined : textOf(sourceStep, 'tak');
        const promptTak = promptStep === undefined ? undefined : textOf(promptStep, 'tak');
        if (sourceTak !== undefined && sourceTak !== promptTak) {
          throw new Error(
            `${start}, but that <Reflectie> is in ${describe(sourceStep)}, and a student on ` +
              `${promptTak === undefined ? 'another branch' : `the branch "${promptTak}"`} never sees it. Take over ` +
              'a <Reflectie> from the same branch or from a shared step.',
          );
        }
        if (question.tag.index > prompt.index) {
          throw new Error(
            `${start}, but that <Reflectie> comes later in the module, in ${describe(sourceStep)}, so the student ` +
              'has not written it yet. Put it before the prompt.',
          );
        }
        const title = sourceStep === undefined ? undefined : textOf(sourceStep, 'titel');
        if (title === undefined) {
          throw new Error(
            `${start}, but that <Reflectie> is not in a <Stap> whose \`titel\` is written as text: while the answer ` +
              'is empty, the prompt names that title.',
          );
        }
        sourceSteps[sourceId] = title;
      }
    }
  }

  // Measurements (BRIEFING § 12, "Vraagtypes"): `vergelijk` names a <Meting>
  // that every student who sees this one has already had in front of them.
  // The rest of a <Meting> is checked by Meting.astro.
  for (const measure of tagsOf(id, body, 'Meting')) {
    const attribute = measure.attributes.get('vergelijk');
    if (attribute === undefined) continue;
    const measureStep = stepOf(measure);
    const where = `<Meting id="${textOf(measure, 'id') ?? '…'}"> in ${describe(measureStep)}`;
    if (attribute.kind !== 'text') {
      throw new Error(`Module "${id}": write \`vergelijk\` of ${where} as text, such as vergelijk="quiz-start".`);
    }
    const start = `Module "${id}": ${where} compares with "${attribute.value}"`;
    const question = questionTags().find(({ tag }) => textOf(tag, 'id') === attribute.value);
    if (question === undefined) {
      throw new Error(
        `${start}, but no question in this module has that \`id\`. Write the \`id\` of a <Meting> earlier in the module.`,
      );
    }
    if (question.component !== 'Meting') {
      throw new Error(`${start}, but that is a <${question.component}>. Only a <Meting> can be compared.`);
    }
    if (question.tag.index === measure.index) {
      throw new Error(`${start}, which is the <Meting> itself. Write the \`id\` of a <Meting> earlier in the module.`);
    }
    const sourceStep = stepOf(question.tag);
    const sourceTak = sourceStep === undefined ? undefined : textOf(sourceStep, 'tak');
    const measureTak = measureStep === undefined ? undefined : textOf(measureStep, 'tak');
    if (sourceTak !== undefined && sourceTak !== measureTak) {
      throw new Error(
        `${start}, but that <Meting> is in ${describe(sourceStep)}, and a student on ` +
          `${measureTak === undefined ? 'another branch' : `the branch "${measureTak}"`} never sees it. Compare with ` +
          'a <Meting> from the same branch or from a shared step.',
      );
    }
    if (question.tag.index > measure.index) {
      throw new Error(
        `${start}, but that <Meting> comes later in the module, in ${describe(sourceStep)}, so the student has not ` +
          'filled it in yet. Put it before this one.',
      );
    }
  }

  // The example deck of <Flashcards> (BRIEFING § 12, "Vraagtypes") is read from
  // the source, not from the rendered children: Markdown would turn "2*3 | 3*2"
  // into emphasis and eat the stars, and a student's pasted list goes through the
  // same parser as these lines.
  const flashcardDecks: Record<string, string> = {};
  for (const tag of tagsOf(id, body, 'Flashcards')) {
    const deckId = textOf(tag, 'id');
    if (deckId === undefined) {
      throw new Error(
        `Module "${id}": the <Flashcards>${whereIs(tag)} needs an \`id\` as text, such as <Flashcards id="kaarten" vraag="…">. ` +
          'The deck and the practice are stored under it: lowercase letters, digits and hyphens, unique among the ' +
          'questions of the module.',
      );
    }
    const closing = /<\/Flashcards\s*>/g;
    closing.lastIndex = tag.end;
    const source = tag.selfClosing ? '' : body.slice(tag.end, closing.exec(body)?.index ?? body.length);
    const example = source
      .split(/\r\n?|\n/)
      .map((line) => line.trim())
      .filter((line) => line !== '')
      .join('\n');
    const deck = parseDeck(example);
    const start = `Module "${id}": the example deck of <Flashcards id="${deckId}">${whereIs(tag)}`;
    const [unreadable] = deck.unreadable;
    if (unreadable !== undefined) {
      throw new Error(
        `${start} has a line that is not a card: "${unreadable}". Write one card per line, as front | back, ` +
          'with exactly one | and text on both sides.',
      );
    }
    if (deck.dropped > 0) {
      throw new Error(`${start} has ${MAX_CARDS + deck.dropped} cards; at most ${MAX_CARDS} count. Remove ${deck.dropped}.`);
    }
    if (example !== '' && deck.cards.length === 0) {
      throw new Error(
        `${start} has no cards. Write one card per line, as front | back, or leave the tags empty for no example deck.`,
      );
    }
    flashcardDecks[deckId] = example;
  }

  return { branching, tool, promptSteps, sourceSteps, choiceChatSteps, flashcardDecks };
}
