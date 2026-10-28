// Local progress and answers of a student (docs/BRIEFING.md § 12).
//
// Everything stays in the student's browser. Every key has the form
// `ai-leerlijn:<module-id>:<key>`:
//   - `stap` is reserved for the step player (the current step, 1-based:
//     its position in the student's route through the module);
//   - a question component stores its answer under `vraag:<id>`, unique
//     within the module (../vragen/answers.ts);
//   - a <Keuze> stores the key of the chosen option under `keuze:<naam>`
//     (choices.ts).
// "Opnieuw beginnen" removes every key of one module, and only those.
//
// localStorage may be missing or throw (private windows, blocked site data,
// a full quota). Every access goes through these functions and is wrapped in
// try/catch, so the site keeps working; progress is then simply not kept.

const PREFIX = 'ai-leerlijn';

export function storageKey(moduleId: string, key: string): string {
  return `${PREFIX}:${moduleId}:${key}`;
}

export function readStored(moduleId: string, key: string): string | null {
  try {
    return window.localStorage.getItem(storageKey(moduleId, key));
  } catch {
    return null;
  }
}

export function writeStored(moduleId: string, key: string, value: string): void {
  try {
    window.localStorage.setItem(storageKey(moduleId, key), value);
  } catch {
    // Storage blocked or full: keep going without saving.
  }
}

// Removes every key of one module. The trailing colon in the prefix keeps
// `voorbeeld` from matching the keys of a module called `voorbeeld-2`.
export function clearModule(moduleId: string): void {
  try {
    const storage = window.localStorage;
    const prefix = storageKey(moduleId, '');
    const doomed: string[] = [];
    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i);
      if (key !== null && key.startsWith(prefix)) doomed.push(key);
    }
    for (const key of doomed) storage.removeItem(key);
  } catch {
    // Storage blocked: there is nothing to clear.
  }
}

// The id of the module an element belongs to: the step player carries it as
// `data-module`. For components inside a step, which do not get the id as a
// prop.
export function moduleIdOf(element: Element): string | null {
  return element.closest<HTMLElement>('[data-module]')?.dataset.module ?? null;
}
