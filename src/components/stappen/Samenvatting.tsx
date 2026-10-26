import { useCallback, useEffect, useRef, useState } from 'react';
import { readAnswer, type StoredAnswer } from '../vragen/answers';
import { moduleIdOf } from './storage';
import styles from './Samenvatting.module.css';

// The summary in the last step of a module (docs/BRIEFING.md § 6 and § 12).
// It shows what the student wrote along the way, with the question next to
// each answer, and copies it all as plain text for the final form in
// Smartschool. The site itself sends nothing anywhere.
//
// It does not need the question islands: every question carries its kind,
// its id and its text as data attributes in the static HTML, also in steps
// that are hidden and not hydrated yet. The answers come from localStorage
// through `readAnswer`. The question text comes from the page, not from
// storage, because the stored one goes stale when an author rewrites it.

// Only what the student wrote: multiple-choice answers are left out.
const KINDS = ['think-first', 'reflection'];
const SELECTOR = KINDS.map((kind) => `[data-question="${kind}"]`).join(', ');

interface Props {
  readonly moduleTitle: string;
  // The final form in Smartschool, or null while the link is not known.
  readonly formUrl: string | null;
}

interface Item {
  readonly id: string;
  readonly question: string;
  // Normalised; '' when the student wrote nothing (yet).
  readonly answer: string;
  // The 1-based step the question is in, for a link back to it.
  readonly step: number | null;
}

// idle: nothing copied yet. copied: the Clipboard API worked. fallback: it
// failed, so the text stands selected in a field for Ctrl+C. fallback-copied:
// the student copied it from that field.
type Mode = 'idle' | 'copied' | 'fallback' | 'fallback-copied';

// Line breaks as \n, no blank lines inside an answer: in the copied text a
// blank line separates one question from the next.
function normalise(text: string): string {
  return text
    .replace(/\r\n?/g, '\n')
    .replace(/[ \t]+$/gm, '')
    .replace(/\n{2,}/g, '\n')
    .trim();
}

function answerOf(stored: StoredAnswer | null, kind: string | undefined): string {
  if (stored === null || stored.kind !== kind) return '';
  return stored.kind === 'multiple-choice' ? '' : normalise(stored.answer);
}

// Every question with something to write, in document order, which is the
// order of the module, with its current answer.
function collect(root: HTMLElement, moduleId: string): Item[] {
  const scope = root.closest<HTMLElement>('[data-module]') ?? document.body;
  const steps = Array.from(scope.querySelectorAll('[data-step]'));
  return Array.from(scope.querySelectorAll<HTMLElement>(SELECTOR), (element) => {
    const id = element.dataset.questionId ?? '';
    const stored = id === '' ? null : readAnswer(moduleId, id);
    const section = element.closest('[data-step]');
    const index = section === null ? -1 : steps.indexOf(section);
    return {
      id,
      question: element.dataset.questionText ?? stored?.question ?? '',
      answer: answerOf(stored, element.dataset.question),
      step: index >= 0 ? index + 1 : null,
    };
  });
}

// Plain text for a text field in Smartschool: the module on top, then every
// question with its answer, separated by a blank line.
function plainText(moduleTitle: string, items: readonly Item[]): string {
  const blocks = items.map((item) => `${item.question}\n${item.answer === '' ? '(niet ingevuld)' : item.answer}`);
  return [`Module: ${moduleTitle}`, ...blocks].join('\n\n');
}

function CheckIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V6a2 2 0 0 1 2-2h9" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </svg>
  );
}

function missingNote(items: readonly Item[]): string {
  const missing = items.filter((item) => item.answer === '').length;
  if (missing === 0) return '';
  return missing === 1 ? ' Eén vraag is nog leeg.' : ` ${missing} vragen zijn nog leeg.`;
}

export default function Samenvatting({ moduleTitle, formUrl }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLTextAreaElement>(null);
  // The text that was last copied or offered for copying.
  const copiedTextRef = useRef('');
  // null until hydrated: the server cannot read localStorage, and the first
  // client render has to match what the server rendered.
  const [items, setItems] = useState<readonly Item[] | null>(null);
  const [mode, setMode] = useState<Mode>('idle');
  // Bumped on every failed attempt, so that the fallback text is selected
  // again, also when the fallback is already showing.
  const [attempt, setAttempt] = useState(0);

  const read = useCallback((): readonly Item[] => {
    const root = rootRef.current;
    const moduleId = root === null ? null : moduleIdOf(root);
    const next = root === null || moduleId === null ? [] : collect(root, moduleId);
    setItems(next);
    // An answer changed after copying: the copied text is out of date, so
    // the confirmation goes and the student copies again.
    if (plainText(moduleTitle, next) !== copiedTextRef.current) setMode('idle');
    return next;
  }, [moduleTitle]);

  // Read when the step with the summary is shown, every time: the student
  // may have gone back and changed an answer. The player hides the other
  // steps with `hidden`, so the summary enters the viewport exactly when its
  // step is shown. Also read while the student types in a question on the
  // same step, if an author puts one there.
  useEffect(() => {
    const root = rootRef.current;
    if (root === null) return;
    read();
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) read();
    });
    observer.observe(root);
    function onInput(event: Event): void {
      if (event.target instanceof Element && event.target.closest('[data-question]') !== null) read();
    }
    document.addEventListener('input', onInput);
    return () => {
      observer.disconnect();
      document.removeEventListener('input', onInput);
    };
  }, [read]);

  useEffect(() => {
    if (mode !== 'fallback') return;
    fieldRef.current?.focus();
    fieldRef.current?.select();
  }, [mode, attempt]);

  async function copyAll(): Promise<void> {
    const text = plainText(moduleTitle, read());
    copiedTextRef.current = text;
    try {
      // Throws when there is no Clipboard API (not a secure context) and
      // rejects when the browser refuses.
      await navigator.clipboard.writeText(text);
      setMode('copied');
    } catch {
      setMode('fallback');
      setAttempt((count) => count + 1);
    }
  }

  const fallback = mode === 'fallback' || mode === 'fallback-copied';
  const copied = mode === 'copied' || mode === 'fallback-copied';
  const text = items === null ? '' : plainText(moduleTitle, items);

  return (
    <div ref={rootRef} className={styles.root} data-summary>
      <p className={styles.intro}>
        Dit schreef je in de module <strong>{moduleTitle}</strong>. Kopieer alles en plak het in het eindformulier op
        Smartschool.
        {items !== null && <strong>{missingNote(items)}</strong>}
      </p>

      {fallback ? (
        <textarea
          ref={fieldRef}
          className={styles.fallback}
          value={text}
          readOnly
          aria-label="Je samenvatting, om te kopiëren"
          onCopy={() => setMode('fallback-copied')}
        />
      ) : (
        <div className={styles.box} tabIndex={0} role="region" aria-label="Wat je schreef">
          <p className={styles.noScript}>
            Je samenvatting verschijnt hier alleen als JavaScript aanstaat in je browser.
          </p>
          {items !== null && items.length === 0 && (
            <p className={styles.empty}>In deze module zijn er geen vragen waarop je zelf iets schrijft.</p>
          )}
          {items !== null && items.length > 0 && (
            <dl className={styles.list}>
              {items.map((item) => (
                <div key={item.id} className={styles.item}>
                  <dt className={styles.question}>{item.question}</dt>
                  {item.answer !== '' ? (
                    <dd className={styles.answer}>{item.answer}</dd>
                  ) : (
                    <dd className={styles.empty}>
                      (nog niet ingevuld)
                      {item.step !== null && (
                        <>
                          {' · '}
                          <a href={`#stap-${item.step}`}>Ga naar stap {item.step}</a>
                        </>
                      )}
                    </dd>
                  )}
                </div>
              ))}
            </dl>
          )}
        </div>
      )}

      <div className={styles.actions}>
        <button type="button" className={copied ? styles.secondary : styles.primary} onClick={copyAll}>
          <CopyIcon />
          Kopieer alles
        </button>
        {mode !== 'idle' &&
          (formUrl !== null ? (
            <a className={styles.primary} href={formUrl} target="_blank" rel="noopener noreferrer">
              Open het eindformulier
              <ExternalIcon />
              <span className={styles.srOnly}> (opent in een nieuw tabblad)</span>
            </a>
          ) : (
            <p className={styles.pending}>De link naar het eindformulier volgt nog.</p>
          ))}
        <p role="status" className={styles.status} data-tone={copied ? 'success' : fallback ? 'warning' : undefined}>
          {copied && (
            <>
              <CheckIcon />
              <span>
                <strong>Gekopieerd.</strong> Plak de tekst in het eindformulier met Ctrl+V.
              </span>
            </>
          )}
          {mode === 'fallback' && (
            <span>
              <strong>Kopiëren lukte niet vanzelf.</strong> De tekst hierboven is geselecteerd: druk op Ctrl+C.
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
