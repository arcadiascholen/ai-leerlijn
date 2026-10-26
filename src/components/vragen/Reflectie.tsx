import { useEffect, useRef, useState } from 'react';
import { moduleIdOf } from '../stappen/storage';
import { readAnswer, writeAnswer } from './answers';
import styles from './Reflectie.module.css';

// A short reflection (docs/BRIEFING.md § 12): the student answers a question
// in their own words. The answer is stored with the question on every
// change, so that it is back after a reload and the summary at the end of
// the module can show it.

interface Props {
  readonly id: string;
  readonly question: string;
}

export default function Reflectie({ id, question }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const moduleIdRef = useRef<string | null>(null);
  const [answer, setAnswer] = useState('');

  const baseId = `vraag-${id}`;

  // Restore after hydration, not during render: the server renders an empty
  // field, and the first client render has to match it.
  useEffect(() => {
    const moduleId = rootRef.current === null ? null : moduleIdOf(rootRef.current);
    moduleIdRef.current = moduleId;
    if (moduleId === null) return;
    const stored = readAnswer(moduleId, id);
    if (stored?.kind !== 'reflection') return;
    setAnswer(stored.answer);
  }, [id]);

  return (
    <div
      ref={rootRef}
      className={styles.root}
      data-question="reflection"
      data-question-id={id}
      data-question-text={question}
    >
      <label htmlFor={`${baseId}-antwoord`} className={styles.question}>
        {question}
      </label>
      <textarea
        id={`${baseId}-antwoord`}
        className={styles.field}
        rows={6}
        placeholder="Typ hier je antwoord"
        value={answer}
        onChange={(event) => {
          setAnswer(event.target.value);
          if (moduleIdRef.current !== null) {
            writeAnswer(moduleIdRef.current, id, { kind: 'reflection', question, answer: event.target.value });
          }
        }}
        aria-describedby={`${baseId}-hint`}
      />
      <p id={`${baseId}-hint`} className={styles.hint}>
        Je antwoord blijft bewaard in deze browser.
      </p>
    </div>
  );
}
