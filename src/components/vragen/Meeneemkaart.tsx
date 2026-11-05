import { useEffect, useLayoutEffect, useRef, useState, type ClipboardEvent, type KeyboardEvent } from 'react';
import { appear } from '../../lib/motion';
import { moduleIdOf } from '../stappen/storage';
import { readTakeawayRows, type TakeawayRow } from './answers';
import styles from './Meeneemkaart.module.css';

// A card with a sentence per situation, for the student to make their own and take
// along (docs/BRIEFING.md § 12, "Vraagtypes"). The fields start with the author's
// sentences. The script in Meeneemkaart.astro stores them; this shows them, fits
// the fields and copies the card. Enter makes a new line, as in any text field.
//
// Copying gives the same confirmation as a <Prompt>. If the clipboard fails, the
// card lies over the rows as one selected text, with the request to press Ctrl+C:
// text fields cannot be selected together. It takes no room, so nothing jumps.

interface Props {
  readonly id: string;
  readonly question: string;
  readonly rows: readonly TakeawayRow[];
}

type Status = 'copied' | 'fallback';

const MESSAGES: Readonly<Record<Status, string>> = {
  copied: 'Gekopieerd',
  fallback: 'Kopiëren lukte niet vanzelf. Je kaart is geselecteerd: druk op Ctrl+C.',
};

// How long "Gekopieerd" stays, as with a <Prompt>.
const CONFIRMATION_MS = 4000;

// One line that grows to three (the CSS caps the height), then scrolls. A field in
// a hidden step has no width yet; the observer fits it when its step is shown.
function fit(field: HTMLTextAreaElement): void {
  if (field.clientWidth === 0) return;
  field.style.height = 'auto';
  const style = window.getComputedStyle(field);
  const borders = Number.parseFloat(style.borderTopWidth) + Number.parseFloat(style.borderBottomWidth);
  field.style.height = `${field.scrollHeight + borders}px`;
}

// The question, a blank line, then "situation: sentence" per row. An empty row is
// left out; in the PDF it is "(niet ingevuld)".
function plainText(question: string, rows: readonly TakeawayRow[], texts: readonly string[]): string {
  const lines = rows.flatMap(({ situation }, index) => {
    const text = (texts[index] ?? '').trim();
    return text === '' ? [] : [`${situation}: ${text}`];
  });
  return `${question}\n\n${lines.join('\n')}`.trim();
}

function fieldsIn(root: HTMLElement | null): HTMLTextAreaElement[] {
  return root === null ? [] : Array.from(root.querySelectorAll<HTMLTextAreaElement>('textarea[data-takeaway-row]'));
}

export default function Meeneemkaart({ id, question, rows }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const selectionRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<number | undefined>(undefined);
  // The first render shows the author's sentences, as the server did.
  const [texts, setTexts] = useState(() => rows.map((row) => row.text));
  const [status, setStatus] = useState<Status | null>(null);

  // After hydration, not during render: the server cannot read localStorage.
  useEffect(() => {
    const root = rootRef.current;
    const moduleId = root === null ? null : moduleIdOf(root);
    const stored = root === null || moduleId === null ? null : readTakeawayRows(moduleId, root);
    if (stored !== null) setTexts(stored.map((row) => row.text));
  }, []);

  useLayoutEffect(() => {
    fieldsIn(rootRef.current).forEach(fit);
  }, [texts]);

  // When the step is shown, when the window changes width, and when the font has
  // loaded: each can change how many lines a sentence takes. Only on a change of
  // width: fitting changes the height, and must not trigger itself.
  useEffect(() => {
    const fields = fieldsIn(rootRef.current);
    const widths = new WeakMap<Element, number>();
    const observer = new ResizeObserver((entries) => {
      for (const { target } of entries) {
        if (target instanceof HTMLTextAreaElement && target.clientWidth !== widths.get(target)) {
          widths.set(target, target.clientWidth);
          fit(target);
        }
      }
    });
    fields.forEach((field) => observer.observe(field));
    void document.fonts.ready.then(() => fields.forEach(fit));
    return () => observer.disconnect();
  }, []);

  // What appears after copying fades in (docs/DESIGN.md, "Beweging"). It is never
  // restored, so this only follows an action of the student.
  useLayoutEffect(() => {
    if (status !== null && statusRef.current !== null) appear(statusRef.current);
    if (status === 'fallback') {
      selectionRef.current?.focus();
      selectionRef.current?.select();
    }
  }, [status]);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const text = plainText(question, rows, texts);

  function confirm(): void {
    window.clearTimeout(timerRef.current);
    setStatus('copied');
    timerRef.current = window.setTimeout(() => setStatus(null), CONFIRMATION_MS);
  }

  async function copy(): Promise<void> {
    try {
      // Throws when there is no Clipboard API (not a secure context) and rejects
      // when the browser refuses.
      await navigator.clipboard.writeText(text);
      confirm();
    } catch {
      window.clearTimeout(timerRef.current);
      setStatus('fallback');
    }
  }

  function change(index: number, value: string): void {
    setTexts((current) => current.map((item, other) => (other === index ? value : item)));
    // What was copied is no longer what the card says.
    window.clearTimeout(timerRef.current);
    setStatus(null);
  }

  // Ctrl+C on the selected card: the whole card, also if the student clicked and
  // the selection is gone.
  function copied(event: ClipboardEvent<HTMLTextAreaElement>): void {
    event.clipboardData.setData('text/plain', text);
    event.preventDefault();
    confirm();
    buttonRef.current?.focus();
  }

  function closeOnEscape(event: KeyboardEvent<HTMLTextAreaElement>): void {
    if (event.key === 'Escape') buttonRef.current?.focus();
  }

  return (
    <div
      ref={rootRef}
      className={styles.root}
      data-question="takeaway-card"
      data-question-id={id}
      data-question-text={question}
      data-takeaway-rows={JSON.stringify(rows)}
    >
      <fieldset className={styles.group}>
        <legend className={styles.question}>{question}</legend>
        {/* Without JavaScript: the situations with the author's sentences. */}
        <dl className={styles.plain}>
          {rows.map(({ situation, text: sentence }) => (
            <div key={situation} className={styles.plainRow}>
              <dt className={styles.label}>{situation}</dt>
              <dd className={styles.plainText}>{sentence}</dd>
            </div>
          ))}
        </dl>
        <div className={styles.card}>
          <div className={styles.rows}>
            {rows.map(({ situation }, index) => (
              <div key={situation} className={styles.row}>
                <label className={styles.label} htmlFor={`vraag-${id}-rij-${index + 1}`}>
                  {situation}
                </label>
                <textarea
                  id={`vraag-${id}-rij-${index + 1}`}
                  className={styles.field}
                  rows={1}
                  // Not restored by the browser on Back or a reload: "Opnieuw
                  // beginnen" has to bring back the author's sentences.
                  autoComplete="off"
                  data-takeaway-row={index}
                  value={texts[index] ?? ''}
                  onChange={(event) => change(index, event.target.value)}
                />
              </div>
            ))}
            {status === 'fallback' && (
              <textarea
                ref={selectionRef}
                className={styles.selection}
                readOnly
                aria-label="Je kaart als tekst"
                value={text}
                onCopy={copied}
                onKeyDown={closeOnEscape}
                onBlur={() => setStatus((current) => (current === 'fallback' ? null : current))}
              />
            )}
          </div>
          <div className={styles.actions}>
            <button ref={buttonRef} type="button" className={styles.copy} onClick={() => void copy()}>
              <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
                <rect x="9" y="9" width="11" height="11" rx="2" />
                <path d="M5 15V6a2 2 0 0 1 2-2h9" />
              </svg>
              Kopieer mijn kaart
            </button>
            {/* Always in the page, also when empty, so that a screen reader reads
                the confirmation when it appears. */}
            <p ref={statusRef} role="status" className={styles.status} data-state={status ?? undefined}>
              {status === 'copied' && (
                <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
              )}
              {status !== null && <span>{MESSAGES[status]}</span>}
            </p>
          </div>
        </div>
      </fieldset>
    </div>
  );
}
