// Choices and branches in a module (docs/BRIEFING.md § 12, "Keuzes en
// takken").
//
// A <Keuze naam="doel" …> stores the key of the chosen option under
// `ai-leerlijn:<module-id>:keuze:<naam>`, through storage.ts, so "Opnieuw
// beginnen" clears it with the rest of the module. Every choice is announced
// on `document` with a CustomEvent named CHOICE_EVENT, whose detail is a
// ChoiceDetail, so that the step player, the summary and any other component
// react at once.
//
// In the static HTML, also in hidden steps that are not hydrated yet:
//   - the root element of every <Keuze> carries `data-choice="<naam>"` and
//     `data-choice-options` (JSON: `{"<key>": "<label>", …}`), and the one
//     branching choice (`vertakt`) also carries `data-branching`;
//   - the <section> of a step in a branch carries `data-tak="<key>"`. A step
//     without it is shared.
//
// Everything here is synchronous, so that a script can read a choice at
// init, before the step is shown.

import { readStored, storageKey, writeStored } from './storage';

export const CHOICE_EVENT = 'ai-leerlijn:keuze';

export interface ChoiceDetail {
  readonly moduleId: string;
  // The `naam` of the <Keuze>.
  readonly name: string;
  // The key of the chosen option.
  readonly value: string;
}

// The choices made since the page loaded. A choice blocks the way forward
// until it is made, so it must hold even when localStorage is blocked: then
// it lasts until the page is left, like everything else.
const madeHere = new Map<string, string>();

export function choiceKey(name: string): string {
  return `keuze:${name}`;
}

// The stored option of a choice, or null if there is none. Not checked
// against the options of the <Keuze>; `chosenOption` does that.
export function readChoice(moduleId: string, name: string): string | null {
  return madeHere.get(storageKey(moduleId, choiceKey(name))) ?? readStored(moduleId, choiceKey(name));
}

export function writeChoice(moduleId: string, name: string, value: string): void {
  madeHere.set(storageKey(moduleId, choiceKey(name)), value);
  writeStored(moduleId, choiceKey(name), value);
  const detail: ChoiceDetail = { moduleId, name, value };
  document.dispatchEvent(new CustomEvent(CHOICE_EVENT, { detail }));
}

function isChoiceDetail(value: unknown): value is ChoiceDetail {
  if (typeof value !== 'object' || value === null) return false;
  const detail = value as Record<string, unknown>;
  return typeof detail.moduleId === 'string' && typeof detail.name === 'string' && typeof detail.value === 'string';
}

// Calls `listener` after every choice on the page. Returns the function that
// stops listening.
export function onChoice(listener: (detail: ChoiceDetail) => void): () => void {
  function handle(event: Event): void {
    if (event instanceof CustomEvent && isChoiceDetail(event.detail)) listener(event.detail);
  }
  document.addEventListener(CHOICE_EVENT, handle);
  return () => document.removeEventListener(CHOICE_EVENT, handle);
}

// The options of a <Keuze> from its static HTML, key → label. Empty if the
// attribute is missing or broken.
export function optionsOf(choice: HTMLElement): Readonly<Record<string, string>> {
  try {
    const value: unknown = JSON.parse(choice.dataset.choiceOptions ?? '');
    if (typeof value !== 'object' || value === null || Array.isArray(value)) return {};
    return Object.fromEntries(
      Object.entries(value).filter((entry): entry is [string, string] => typeof entry[1] === 'string'),
    );
  } catch {
    return {};
  }
}

// The key of the option chosen in the <Keuze> `choice`, or null while there
// is none. A stored key that is no longer an option (an author removed it)
// counts as not chosen.
export function chosenOption(choice: HTMLElement, moduleId: string): string | null {
  const name = choice.dataset.choice;
  if (name === undefined) return null;
  const value = readChoice(moduleId, name);
  return value !== null && Object.hasOwn(optionsOf(choice), value) ? value : null;
}

// Whether `step` holds a <Keuze> that is not made yet. The player keeps
// "Volgende" disabled on such a step.
export function hasOpenChoice(step: HTMLElement, moduleId: string): boolean {
  return Array.from(step.querySelectorAll<HTMLElement>('[data-choice]')).some(
    (choice) => chosenOption(choice, moduleId) === null,
  );
}

export interface Route {
  // The steps the student follows, in the order of the module: every shared
  // step, plus the steps of the chosen branch. Until the branching choice is
  // made, no branch step is in it.
  readonly steps: readonly HTMLElement[];
  // The furthest position in `steps` (1-based) the student can reach: the
  // step with the branching choice while that choice is open, otherwise the
  // last step.
  readonly limit: number;
}

// The one place that decides which steps a student sees. The step player and
// the summary both use it: positions in `steps` are the step numbers of
// "Stap n van m", of `#stap-n` and of the stored step. Never decide it from
// `hidden`: the player hides every step except the current one.
export function routeOf(scope: ParentNode, moduleId: string): Route {
  const all = Array.from(scope.querySelectorAll<HTMLElement>('[data-step]'));
  const choice = scope.querySelector<HTMLElement>('[data-choice][data-branching]');
  const chosen = choice === null ? null : chosenOption(choice, moduleId);
  const steps = all.filter((step) => step.dataset.tak === undefined || step.dataset.tak === chosen);
  const choiceStep = choice?.closest<HTMLElement>('[data-step]') ?? null;
  const at = choiceStep === null ? -1 : steps.indexOf(choiceStep);
  return { steps, limit: chosen === null && at >= 0 ? at + 1 : steps.length };
}
