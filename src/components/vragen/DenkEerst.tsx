import { useEffect, useRef, useState, type ReactNode } from 'react';
import { appear } from '../../lib/motion';
import { moduleIdOf } from '../stappen/storage';
import { readAnswer, writeAnswer } from './answers';
import styles from './DenkEerst.module.css';

// "Think first, then show" (docs/BRIEFING.md § 12). The student writes an
// answer in a text field; the button that shows the example answer only
// works after MIN_WORDS words, so that nobody clicks straight through. The
// example then appears next to the student's answer, for comparison. The
// answer and whether the example was shown are stored, with the question,
// so that the summary at the end of a module can show them.

// Words needed before the example answer can be shown.
const MIN_WORDS = 3;

interface Props {
  readonly id: string;
  readonly question: string;
  // The example answer: the MDX between the tags, as static HTML.
  readonly children?: ReactNode;
}

// A word is a run of non-space characters with at least one letter or digit,
// so "... ... ..." does not count.
function countWords(text: string): number {
  return text.split(/\s+/).filter((word) => /[\p{L}\p{N}]/u.test(word)).length;
}

function hint(words: number, shown: boolean): string {
  if (shown) return 'Vergelijk met jouw antwoord. Je mag je antwoord nog aanpassen.';
  if (words >= MIN_WORDS) return 'Klaar? Toon dan het voorbeeldantwoord.';
  if (words === 0) return `Typ eerst minstens ${MIN_WORDS} woorden. Daarna kun je het voorbeeldantwoord tonen.`;
  const left = MIN_WORDS - words;
  return `Nog ${left} ${left === 1 ? 'woord' : 'woorden'}, dan kun je het voorbeeldantwoord tonen.`;
}

export default function DenkEerst({ id, question, children }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLTextAreaElement>(null);
  const exampleRef = useRef<HTMLElement>(null);
  const moduleIdRef = useRef<string | null>(null);
  // Set by the button only: a restored answer does not move the focus.
  const focusExampleRef = useRef(false);
  const [answer, setAnswer] = useState('');
  const [shown, setShown] = useState(false);

  const words = countWords(answer);
  const baseId = `vraag-${id}`;

  // Restore after hydration, not during render: the server renders an empty
  // field, and the first client render has to match it.
  useEffect(() => {
    const moduleId = rootRef.current === null ? null : moduleIdOf(rootRef.current);
    moduleIdRef.current = moduleId;
    if (moduleId === null) return;
    const stored = readAnswer(moduleId, id);
    if (stored?.kind === 'think-first') {
      setAnswer(stored.answer);
      setShown(stored.shown);
      return;
    }
    // What the student typed before hydration stays in the field, but not
    // in the state: it would not be stored until the next keystroke, and the
    // button would stay disabled. Take it over. The field has
    // autocomplete="off", so the browser does not restore old text into it
    // on Back or a reload.
    const typed = fieldRef.current?.value ?? '';
    if (typed === '') return;
    setAnswer(typed);
    save(typed, false);
  }, [id]);

  useEffect(() => {
    if (shown && focusExampleRef.current) {
      focusExampleRef.current = false;
      exampleRef.current?.focus();
    }
  }, [shown]);

  function save(nextAnswer: string, nextShown: boolean): void {
    if (moduleIdRef.current === null) return;
    writeAnswer(moduleIdRef.current, id, { kind: 'think-first', question, answer: nextAnswer, shown: nextShown });
  }

  function show(): void {
    if (words < MIN_WORDS) return;
    // Fades in as it appears, after the button only: a restored example
    // answer simply stands there (docs/DESIGN.md, "Beweging").
    if (exampleRef.current !== null) appear(exampleRef.current);
    focusExampleRef.current = true;
    setShown(true);
    save(answer, true);
  }

  return (
    <div
      ref={rootRef}
      className={styles.root}
      data-question="think-first"
      data-question-id={id}
      data-question-text={question}
      data-shown={shown ? '' : undefined}
    >
      <label htmlFor={`${baseId}-antwoord`} className={styles.question}>
        {question}
      </label>
      <div className={styles.columns}>
        <div className={styles.own}>
          <textarea
            ref={fieldRef}
            id={`${baseId}-antwoord`}
            className={styles.field}
            rows={5}
            placeholder="Typ hier je antwoord"
            autoComplete="off"
            value={answer}
            onChange={(event) => {
              setAnswer(event.target.value);
              save(event.target.value, shown);
            }}
            aria-describedby={`${baseId}-hint`}
          />
          <div className={styles.actions}>
            {!shown && (
              <button type="button" className={styles.show} disabled={words < MIN_WORDS} onClick={show}>
                Toon voorbeeldantwoord
              </button>
            )}
            <p id={`${baseId}-hint`} className={styles.hint} aria-live="polite">
              {hint(words, shown)}
            </p>
          </div>
        </div>
        <div className={styles.side}>
          <p className={styles.placeholder}>Hier verschijnt een voorbeeldantwoord, zodra je zelf iets schreef.</p>
          <section ref={exampleRef} className={styles.example} tabIndex={-1} aria-labelledby={`${baseId}-voorbeeld`}>
            <p id={`${baseId}-voorbeeld`} className={styles.label}>
              Voorbeeldantwoord
            </p>
            <div className={styles.exampleText}>{children}</div>
          </section>
        </div>
      </div>
    </div>
  );
}
