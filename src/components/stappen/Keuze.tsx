import { useEffect, useRef, useState } from 'react';
import type { KeuzeOption } from '../vragen/authoring';
import { readChoice, writeChoice } from './choices';
import { moduleIdOf } from './storage';
import styles from './Keuze.module.css';

// A choice (docs/BRIEFING.md § 12, "Keuzes en takken"): a question with one
// card per option. The cards are a native radio group in a fieldset, so the
// keyboard works as everywhere: Tab into the group, the arrow keys to choose.
// A choice is stored at once and announced with CHOICE_EVENT (choices.ts):
// the step player then enables "Volgende" and, for the branching choice,
// shows the steps of the chosen branch. The student may come back and choose
// again; what they wrote in the other branch stays stored.
//
// The static HTML carries the name and the options as data attributes, so
// that the player and the summary know the choice without this island.

interface Props {
  readonly name: string;
  readonly question: string;
  readonly options: readonly KeuzeOption[];
  readonly branching: boolean;
}

export default function Keuze({ name, question, options, branching }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const moduleIdRef = useRef<string | null>(null);
  const [chosen, setChosen] = useState<string | null>(null);

  // Restore after hydration, not during render: the server renders the
  // choice open, and the first client render has to match it.
  useEffect(() => {
    const root = rootRef.current;
    const moduleId = root === null ? null : moduleIdOf(root);
    moduleIdRef.current = moduleId;
    if (root === null || moduleId === null) return;
    const stored = readChoice(moduleId, name);
    if (stored !== null && options.some((option) => option.key === stored)) {
      setChosen(stored);
      return;
    }
    // A click before hydration checks its radio in the DOM, without
    // onChange, and hydration leaves that radio checked. Nothing would be
    // stored, "Volgende" would stay disabled, and a second click on the same
    // radio changes nothing, so it fires no onChange either. Take that click
    // as the choice. The radios have autocomplete="off", so the browser does
    // not check one itself when it restores the page on Back or a reload.
    const checked = root.querySelector<HTMLInputElement>('input[type="radio"]:checked');
    if (checked !== null && options.some((option) => option.key === checked.value)) choose(checked.value);
  }, [name, options]);

  // From onChange and from onClick: a click on a radio that is checked but
  // not stored (see above) fires no change. A choice that is already stored
  // is not written again, so a click on the chosen option announces nothing.
  function choose(key: string): void {
    setChosen(key);
    const moduleId = moduleIdRef.current;
    if (moduleId !== null && readChoice(moduleId, name) !== key) writeChoice(moduleId, name, key);
  }

  const labels = JSON.stringify(Object.fromEntries(options.map((option) => [option.key, option.label])));

  return (
    <div
      ref={rootRef}
      className={styles.root}
      data-choice={name}
      data-choice-options={labels}
      data-branching={branching ? '' : undefined}
    >
      <fieldset className={styles.group}>
        <legend className={styles.question}>{question}</legend>
        <div className={styles.options}>
          {options.map((option) => (
            <label key={option.key} className={styles.option}>
              <input
                type="radio"
                className={styles.radio}
                name={`keuze-${name}`}
                value={option.key}
                // Not restored by the browser on Back or a reload: only the
                // student's own click may count as a choice.
                autoComplete="off"
                checked={chosen === option.key}
                onChange={() => choose(option.key)}
                onClick={() => choose(option.key)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
