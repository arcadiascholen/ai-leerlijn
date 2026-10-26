import { useEffect, useRef, useState } from 'react';
import { moduleIdOf } from '../stappen/storage';
import { readAnswer, writeAnswer } from './answers';
import type { ChoiceOption } from './authoring';
import styles from './Meerkeuze.module.css';

// Multiple choice with direct feedback (docs/BRIEFING.md § 12). Every option
// is a button. Choosing one marks it right or wrong, with an icon and a word,
// and shows its own feedback, which stays. After a wrong choice the student
// simply chooses again; the question is done when every right option is
// found. The chosen options are stored, so they are back after a reload.

interface Props {
  readonly id: string;
  readonly question: string;
  readonly options: readonly ChoiceOption[];
}

function CheckIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function hint(rightCount: number, found: number, chosenCount: number): string {
  if (rightCount === 1) {
    if (found === 1) return 'Je vond het juiste antwoord.';
    return chosenCount === 0 ? 'Kies het juiste antwoord.' : 'Kies opnieuw.';
  }
  if (found === rightCount) return 'Je vond alle juiste antwoorden.';
  if (found === 0) return `Er zijn ${rightCount} juiste antwoorden. Kies ze ${rightCount === 2 ? 'allebei' : 'allemaal'}.`;
  return `Je vond ${found} van de ${rightCount} juiste antwoorden. Kies verder.`;
}

export default function Meerkeuze({ id, question, options }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const moduleIdRef = useRef<string | null>(null);
  const [chosen, setChosen] = useState<readonly number[]>([]);
  // Read out by a screen reader after every choice; the same feedback is
  // visible in the option itself.
  const [announcement, setAnnouncement] = useState('');

  const rightCount = options.filter((option) => option.correct).length;
  const found = chosen.filter((index) => options[index]?.correct === true).length;
  const baseId = `vraag-${id}`;

  // Restore after hydration, not during render: the server renders the
  // question unanswered, and the first client render has to match it.
  useEffect(() => {
    const moduleId = rootRef.current === null ? null : moduleIdOf(rootRef.current);
    moduleIdRef.current = moduleId;
    if (moduleId === null) return;
    const stored = readAnswer(moduleId, id);
    if (stored?.kind !== 'multiple-choice') return;
    setChosen(
      stored.chosen.filter(
        (index, position, all) => index >= 0 && index < options.length && all.indexOf(index) === position,
      ),
    );
  }, [id, options.length]);

  function choose(index: number): void {
    const option = options[index];
    if (option === undefined || chosen.includes(index)) return;
    const next = [...chosen, index];
    setChosen(next);

    const verdict = option.correct ? 'Juist.' : 'Niet juist.';
    const nextFound = found + (option.correct ? 1 : 0);
    const progress =
      option.correct && rightCount > 1 ? ` Je vond ${nextFound} van de ${rightCount} juiste antwoorden.` : '';
    setAnnouncement(`${verdict} ${option.feedback}${progress}`);

    if (moduleIdRef.current !== null) {
      writeAnswer(moduleIdRef.current, id, { kind: 'multiple-choice', question, chosen: next });
    }
  }

  return (
    <div ref={rootRef} className={styles.root} data-question="multiple-choice" data-question-id={id}>
      <p id={`${baseId}-vraag`} className={styles.question}>
        {question}
      </p>
      <p className={styles.hint}>{hint(rightCount, found, chosen.length)}</p>
      <ul className={styles.options} role="list" aria-labelledby={`${baseId}-vraag`}>
        {options.map((option, index) => {
          const isChosen = chosen.includes(index);
          const feedbackId = `${baseId}-feedback-${index + 1}`;
          return (
            <li
              key={index}
              className={styles.option}
              data-state={isChosen ? (option.correct ? 'right' : 'wrong') : undefined}
            >
              <button
                type="button"
                className={styles.choice}
                onClick={() => choose(index)}
                aria-describedby={isChosen ? feedbackId : undefined}
                dangerouslySetInnerHTML={{ __html: option.html }}
              />
              {isChosen && (
                <p id={feedbackId} className={styles.feedback}>
                  <span className={styles.verdict}>
                    {option.correct ? <CheckIcon /> : <CrossIcon />}
                    {option.correct ? 'Juist' : 'Niet juist'}
                    <span className={styles.srOnly}>.</span>
                  </span>{' '}
                  {option.feedback}
                </p>
              )}
            </li>
          );
        })}
      </ul>
      <p role="status" className={styles.srOnly}>
        {announcement}
      </p>
    </div>
  );
}
