import { useCallback, useEffect, useRef, useState } from 'react';
import { appear, settle } from '../../lib/motion';
import { onChoice, routeOf } from '../stappen/choices';
import { moduleIdOf } from '../stappen/storage';
import { CONFIDENCE_MAX, readMeasure, writeAnswer, type MeasureValues } from './answers';
import styles from './Meting.module.css';

// A score and how sure the student is (docs/BRIEFING.md § 12, "Vraagtypes"):
// two rows of buttons that are native radio groups, so the keyboard works as
// everywhere: Tab into a group, the arrow keys to choose. The player leaves the
// arrow keys alone inside an input. Every click is stored, also while the other
// row is still open. The site gives no verdict: no right or wrong, no barometer
// colours.
//
// With `compareWith`, a sentence below puts the earlier <Meting> next to this
// one once both rows are chosen, or links to its step while it is not filled
// in. This island stays mounted in a hidden step (the player switches with
// `hidden`), so it reads the earlier one again every time its step is shown.

interface Props {
  readonly id: string;
  readonly question: string;
  readonly max: number;
  readonly compareWith?: string | undefined;
}

// The earlier <Meting>, as the sentence needs it.
interface Source {
  readonly values: MeasureValues;
  readonly title: string;
  // Its position in the student's route, for `#stap-n`.
  readonly step: number | null;
}

function numbers(from: number, to: number): number[] {
  return Array.from({ length: to - from + 1 }, (_, index) => from + index);
}

// The radio of this name that is checked in the DOM, as a number.
function checkedIn(root: HTMLElement, name: string): number | null {
  const checked = root.querySelector<HTMLInputElement>(`input[name="${name}"]:checked`);
  return checked === null ? null : Number(checked.value);
}

interface RowProps {
  readonly legend: string;
  readonly name: string;
  readonly values: readonly number[];
  readonly chosen: number | null;
  readonly onChoose: (value: number) => void;
  // The meaning of the two ends of the row: beside it on screen, and in the
  // name of the first and the last radio for a screen reader.
  readonly ends?: readonly [low: string, high: string];
}

function Row({ legend, name, values, chosen, onChoose, ends }: RowProps) {
  return (
    <fieldset className={styles.group}>
      <legend className={styles.question}>{legend}</legend>
      <div className={styles.row}>
        {ends !== undefined && (
          <span className={styles.end} aria-hidden="true">
            {ends[0]}
          </span>
        )}
        {values.map((value, index) => (
          <label key={value} className={styles.option}>
            <input
              type="radio"
              className={styles.radio}
              name={name}
              value={value}
              // Not restored by the browser on Back or a reload: only the
              // student's own click may count as a choice.
              autoComplete="off"
              checked={chosen === value}
              onChange={() => onChoose(value)}
            />
            <span className={styles.number}>
              {value}
              {ends !== undefined && index === 0 && <span className={styles.srOnly}> {ends[0]}</span>}
              {ends !== undefined && index === values.length - 1 && <span className={styles.srOnly}> {ends[1]}</span>}
            </span>
          </label>
        ))}
        {ends !== undefined && (
          <span className={styles.end} aria-hidden="true">
            {ends[1]}
          </span>
        )}
      </div>
    </fieldset>
  );
}

export default function Meting({ id, question, max, compareWith }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const moduleIdRef = useRef<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [source, setSource] = useState<Source | null>(null);
  // True from the render that shows the restored values, if any.
  const [restored, setRestored] = useState(false);
  // Set by the student's first choice: a sentence that mounts after it fades
  // in. A restored sentence simply stands there (docs/DESIGN.md, "Beweging").
  const choseRef = useRef(false);
  const appearIfChosen = useCallback((element: HTMLElement | null) => {
    if (element !== null && choseRef.current) appear(element);
  }, []);

  const scoreName = `meting-${id}-score`;
  const confidenceName = `meting-${id}-zekerheid`;

  function save(nextScore: number | null, nextConfidence: number | null): void {
    if (moduleIdRef.current === null) return;
    writeAnswer(moduleIdRef.current, id, { kind: 'measure', question, score: nextScore, max, confidence: nextConfidence });
  }

  // Restore after hydration, not during render: the server renders both rows
  // open, and the first client render has to match it.
  useEffect(() => {
    setRestored(true);
    const root = rootRef.current;
    if (root === null) return;
    const moduleId = moduleIdOf(root);
    moduleIdRef.current = moduleId;
    const stored = moduleId === null ? null : readMeasure(moduleId, root);
    // A click before hydration checks its radio in the DOM, without onChange,
    // and hydration leaves that radio checked. It is newer than what is stored,
    // also when the other row or an earlier visit stored something. Nothing
    // else checks a radio here: they have autocomplete="off", so the browser
    // does not when it restores the page on Back or a reload.
    const clickedScore = checkedIn(root, scoreName);
    const clickedConfidence = checkedIn(root, confidenceName);
    const nextScore = clickedScore ?? stored?.score ?? null;
    const nextConfidence = clickedConfidence ?? stored?.confidence ?? null;
    setScore(nextScore);
    setConfidence(nextConfidence);
    if (clickedScore !== null || clickedConfidence !== null) {
      choseRef.current = true;
      save(nextScore, nextConfidence);
    }
  }, [id, scoreName, confidenceName]);

  // The buttons change colour when the student chooses, not when the restored
  // values appear.
  useEffect(() => {
    if (restored && rootRef.current !== null) settle(rootRef.current);
  }, [restored]);

  // Read the earlier <Meting> when this step is shown, every time: the student
  // may have gone back and changed it, or chosen another branch, which changes
  // its step number. The player hides the other steps with `hidden`, so this
  // island enters the viewport exactly when its step is shown. Also after a
  // choice or a click on the same step, if an author puts them there: the
  // earlier <Meting> stored its value on the click, before this change event.
  useEffect(() => {
    const root = rootRef.current;
    const moduleId = root === null ? null : moduleIdOf(root);
    if (compareWith === undefined || root === null || moduleId === null) return;
    const scope = root.closest<HTMLElement>('[data-module]') ?? document.body;
    function read(): void {
      const element = scope.querySelector<HTMLElement>(`[data-question-id="${compareWith}"]`);
      if (element === null || moduleId === null) return;
      const section = element.closest<HTMLElement>('[data-step]');
      const position = section === null ? -1 : routeOf(scope, moduleId).steps.indexOf(section);
      setSource({
        values: readMeasure(moduleId, element),
        title: (section?.querySelector('[data-step-title]')?.textContent ?? '').replace(/\s+/g, ' ').trim(),
        step: position < 0 ? null : position + 1,
      });
    }
    read();
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) read();
    });
    observer.observe(root);
    function onChange(event: Event): void {
      if (event.target instanceof Element && event.target.closest('[data-question="measure"]') !== null) read();
    }
    document.addEventListener('change', onChange);
    const stopChoices = onChoice(() => read());
    return () => {
      observer.disconnect();
      document.removeEventListener('change', onChange);
      stopChoices();
    };
  }, [compareWith]);

  function chooseScore(value: number): void {
    choseRef.current = true;
    setScore(value);
    save(value, confidence);
  }

  function chooseConfidence(value: number): void {
    choseRef.current = true;
    setConfidence(value);
    save(score, value);
  }

  const filled = score !== null && confidence !== null;
  const earlier = source?.values;

  return (
    <div
      ref={rootRef}
      className={styles.root}
      data-question="measure"
      data-question-id={id}
      data-question-text={question}
      data-measure-max={max}
    >
      <Row legend={question} name={scoreName} values={numbers(0, max)} chosen={score} onChoose={chooseScore} />
      <Row
        legend="Hoe zeker ben je dat je dit zonder hulp kunt?"
        name={confidenceName}
        values={numbers(1, CONFIDENCE_MAX)}
        chosen={confidence}
        onChoose={chooseConfidence}
        ends={['Helemaal niet zeker', 'Heel zeker']}
      />
      {/* Always in the page, also when empty, so that a screen reader reads the
          sentence when it appears. */}
      {compareWith !== undefined && (
        <p role="status" className={styles.status}>
          {filled && source !== null && earlier !== undefined && (
            <span ref={appearIfChosen} className={styles.comparison}>
              {earlier.score !== null && earlier.confidence !== null ? (
                `Bij de start: ${earlier.score} van ${earlier.max}, zekerheid ${earlier.confidence} van ${CONFIDENCE_MAX}. ` +
                `Nu: ${score} van ${max}, zekerheid ${confidence} van ${CONFIDENCE_MAX}.`
              ) : (
                <>
                  Vul ook je meting in „{source.title}" in, dan zie je hier de vergelijking.
                  {source.step !== null && (
                    <>
                      {' '}
                      <a href={`#stap-${source.step}`}>Ga naar stap {source.step}</a>
                    </>
                  )}
                </>
              )}
            </span>
          )}
        </p>
      )}
    </div>
  );
}
