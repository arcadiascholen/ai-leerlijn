import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { appear, appearOnMount } from '../../lib/motion';
import { readAnswer, type StoredAnswer } from '../vragen/answers';
import { chosenOption, onChoice, optionsOf, routeOf } from './choices';
import {
  choiceLine,
  downloadPdf,
  fieldLine,
  formatDate,
  NOT_ANSWERED,
  SITE_NAME,
  type PdfField,
  type PdfItem,
  type PdfSummary,
} from './pdf';
import { moduleIdOf } from './storage';
import styles from './Samenvatting.module.css';

// The summary in the last step of a module (docs/BRIEFING.md § 6 and § 12).
// It says how many questions the student filled in, lists what is still
// empty with a link back to its step, and turns everything the student wrote
// into a PDF (pdf.ts) to upload to the final form in Smartschool. The site
// itself sends nothing anywhere.
//
// It does not need the question islands: every question carries its kind,
// its id and its text as data attributes in the static HTML, also in steps
// that are hidden and not hydrated yet. The answers come from localStorage
// through `readAnswer`. The question text comes from the page, not from
// storage, because the stored one goes stale when an author rewrites it.
//
// A prompt with fields (<Prompt velden={…}>) is one question: the title of
// its step, with a line per field. It counts as filled in when every field
// is.
//
// The choices (<Keuze>) come first, one line each. In a module with
// branches only the steps of the student's route count (routeOf in
// choices.ts): the questions of a branch the student did not choose are left
// out, and the step numbers are positions in the route.
//
// If the PDF cannot be made (jsPDF does not load on a flaky connection, or
// building it throws), the student prints to PDF instead. For that, the full
// summary is in the page too, hidden on screen; the print styles in
// Samenvatting.module.css show only that on paper.

// Only what the student wrote: multiple-choice answers are left out.
const KINDS = ['think-first', 'reflection', 'prompt-fields'];
const SELECTOR = KINDS.map((kind) => `[data-question="${kind}"]`).join(', ');

interface Props {
  readonly moduleTitle: string;
  // The final form in Smartschool, or null while the link is not known.
  readonly formUrl: string | null;
}

interface Choice {
  readonly name: string;
  // The text of the chosen option; '' while nothing is chosen.
  readonly label: string;
  // The 1-based step the choice is in, for a link back to it.
  readonly step: number | null;
}

// A question with what the student wrote by now, as the PDF takes it: an
// answer (normalised; '' when the student wrote nothing yet), or the fields
// of a prompt. With its id, and the 1-based step it is in, for a link back to
// it.
type Item = PdfItem & {
  readonly id: string;
  readonly step: number | null;
};

// idle: nothing saved yet. downloaded: the browser got the PDF. print: the
// PDF failed, so the student is asked to print to PDF. printed: the print
// dialog closed (`afterprint`); whether the student saved or cancelled, the
// browser does not say.
type Mode = 'idle' | 'downloaded' | 'print' | 'printed';

// Line breaks as \n, no trailing spaces and no blank lines inside an
// answer, so that it reads as one block under its question.
function normalise(text: string): string {
  return text
    .replace(/\r\n?/g, '\n')
    .replace(/[ \t]+$/gm, '')
    .replace(/\n{2,}/g, '\n')
    .trim();
}

function answerOf(stored: StoredAnswer | null, kind: string | undefined): string {
  if (stored === null || stored.kind !== kind) return '';
  return stored.kind === 'think-first' || stored.kind === 'reflection' ? normalise(stored.answer) : '';
}

// The fields of a prompt, in the order of `velden`, each with its label from
// the page (`data-prompt-fields`) and what the student wrote in it.
function fieldsOf(element: HTMLElement, stored: StoredAnswer | null): PdfField[] {
  const labels = JSON.parse(element.dataset.promptFields ?? '[]') as [name: string, label: string][];
  const values = stored?.kind === 'prompt-fields' ? stored.fields : {};
  return labels.map(([name, label]) => {
    const value = Object.hasOwn(values, name) ? values[name] : undefined;
    return { label, value: typeof value === 'string' ? normalise(value) : '' };
  });
}

// A prompt with fields is filled in when every field is.
function isFilled(item: Item): boolean {
  if (item.kind === 'answer') return item.answer !== '';
  return item.fields.length > 0 && item.fields.every((field) => field.value !== '');
}

interface Collected {
  readonly choices: readonly Choice[];
  readonly items: readonly Item[];
}

// The elements matching `selector` on the student's route, in document
// order, which is the order of the module, each with its step in the route.
// An element outside any step is kept, without a step.
type Placed = readonly [element: HTMLElement, step: number | null];

function onRoute(scope: HTMLElement, moduleId: string, selector: string): Placed[] {
  const { steps } = routeOf(scope, moduleId);
  return Array.from(scope.querySelectorAll<HTMLElement>(selector)).flatMap((element): Placed[] => {
    const section = element.closest<HTMLElement>('[data-step]');
    if (section === null) return [[element, null]];
    const index = steps.indexOf(section);
    return index < 0 ? [] : [[element, index + 1]];
  });
}

// Every choice and every question with something to write, with what the
// student chose or wrote by now.
function collect(root: HTMLElement, moduleId: string): Collected {
  const scope = root.closest<HTMLElement>('[data-module]') ?? document.body;
  const choices = onRoute(scope, moduleId, '[data-choice]').map(([element, step]) => {
    const chosen = chosenOption(element, moduleId);
    return {
      name: element.dataset.choice ?? '',
      label: chosen === null ? '' : (optionsOf(element)[chosen] ?? ''),
      step,
    };
  });
  const items = onRoute(scope, moduleId, SELECTOR).map(([element, step]): Item => {
    const id = element.dataset.questionId ?? '';
    const stored = id === '' ? null : readAnswer(moduleId, id);
    const question = element.dataset.questionText ?? stored?.question ?? '';
    if (element.dataset.question === 'prompt-fields') {
      return { kind: 'fields', id, question, fields: fieldsOf(element, stored), step };
    }
    return { kind: 'answer', id, question, answer: answerOf(stored, element.dataset.question), step };
  });
  return { choices, items };
}

// What the PDF or the paper holds, to tell whether it went out of date.
function signature({ choices, items }: Collected): string {
  return JSON.stringify([
    choices.map((choice) => choice.label),
    items.map((item) => [
      item.question,
      item.kind === 'answer' ? item.answer : item.fields.map((field) => [field.label, field.value]),
    ]),
  ]);
}

// "doel" becomes "Doel", for the line "Doel: Een schriftelijke toets".
function choiceTitle(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function pdfOf(moduleId: string, moduleTitle: string, { choices, items }: Collected): PdfSummary {
  return {
    moduleId,
    moduleTitle,
    choices: choices.map((choice) => ({ title: choiceTitle(choice.name), label: choice.label })),
    items: items.map(
      (item): PdfItem =>
        item.kind === 'answer'
          ? { kind: 'answer', question: item.question, answer: item.answer }
          : { kind: 'fields', question: item.question, fields: item.fields },
    ),
    date: new Date(),
  };
}

// "In de module … vulde je 12 van de 14 vragen in." Only the questions count,
// not the choices.
function intro(moduleTitle: string, items: readonly Item[]): ReactNode {
  const total = items.length;
  const filled = items.filter(isFilled).length;
  const start = (
    <>
      In de module <strong>{moduleTitle}</strong>
    </>
  );
  if (total === 0) return <>{start} zijn er geen vragen waarop je zelf iets schrijft.</>;
  if (total === 1) return <>{start} vulde je de vraag {filled === 1 ? 'in' : 'nog niet in'}.</>;
  if (filled === total) return <>{start} vulde je {total === 2 ? 'beide' : `alle ${total}`} vragen in.</>;
  if (filled === 0) return <>{start} vulde je nog geen van de {total} vragen in.</>;
  return (
    <>
      {start} vulde je {filled} van de {total} vragen in.
    </>
  );
}

function CheckIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
    </svg>
  );
}

function PrintIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 9V4h10v5M7 17H5a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-2" />
      <rect x="7" y="14" width="10" height="6" rx="1" />
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

// " · Ga naar stap n", after an empty answer or an open choice.
function StepLink({ step }: { readonly step: number | null }) {
  if (step === null) return null;
  return (
    <>
      {' · '}
      <a href={`#stap-${step}`}>Ga naar stap {step}</a>
    </>
  );
}

// The full summary for paper: the same as the PDF, with every question,
// also the ones that are filled in. Hidden on screen, and so for screen
// readers too.
function OnPaper({ moduleTitle, collected }: { readonly moduleTitle: string; readonly collected: Collected }) {
  return (
    <div className={styles.paper} data-summary-print>
      <p className={styles.paperSite}>{SITE_NAME}</p>
      <p className={styles.paperTitle}>{moduleTitle}</p>
      <p className={styles.paperMeta}>afgedrukt op {formatDate(new Date())}</p>
      {collected.choices.length > 0 && (
        <ul className={styles.paperChoices}>
          {collected.choices.map((choice) => (
            <li key={choice.name}>{choiceLine({ title: choiceTitle(choice.name), label: choice.label })}</li>
          ))}
        </ul>
      )}
      <dl className={styles.paperList}>
        {collected.items.map((item) => (
          <div key={item.id} className={styles.paperItem}>
            <dt className={styles.paperQuestion}>{item.question}</dt>
            {item.kind === 'answer' ? (
              <dd className={item.answer !== '' ? styles.paperAnswer : styles.paperEmpty}>
                {item.answer !== '' ? item.answer : NOT_ANSWERED}
              </dd>
            ) : (
              item.fields.map((field, index) => (
                <dd key={index} className={field.value !== '' ? styles.paperAnswer : styles.paperEmpty}>
                  {fieldLine(field)}
                </dd>
              ))
            )}
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function Samenvatting({ moduleTitle, formUrl }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const emptyTitleId = useId();
  // The signature of what was last downloaded or offered for printing.
  const savedRef = useRef('');
  // While jsPDF loads and the PDF is made: a second click does nothing.
  const busyRef = useRef(false);
  // null until hydrated: the server cannot read localStorage, and the first
  // client render has to match what the server rendered.
  const [collected, setCollected] = useState<Collected | null>(null);
  const [mode, setMode] = useState<Mode>('idle');
  const [busy, setBusy] = useState(false);

  const read = useCallback((): Collected => {
    const root = rootRef.current;
    const moduleId = root === null ? null : moduleIdOf(root);
    const next = root === null || moduleId === null ? { choices: [], items: [] } : collect(root, moduleId);
    setCollected(next);
    // An answer changed after the download: the PDF is out of date, so the
    // confirmation and the form button go, and the student downloads again.
    if (signature(next) !== savedRef.current) setMode('idle');
    return next;
  }, []);

  // Read when the step with the summary is shown, every time: the student
  // may have gone back and changed an answer. The player hides the other
  // steps with `hidden`, so the summary enters the viewport exactly when its
  // step is shown. Also read while the student types in a question on the
  // same step, if an author puts one there, and after every choice.
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
    const stopChoices = onChoice(() => read());
    return () => {
      observer.disconnect();
      document.removeEventListener('input', onInput);
      stopChoices();
    };
  }, [read]);

  async function download(): Promise<void> {
    const root = rootRef.current;
    if (busyRef.current || root === null) return;
    const next = read();
    savedRef.current = signature(next);
    busyRef.current = true;
    setBusy(true);
    try {
      await downloadPdf(pdfOf(moduleIdOf(root) ?? 'module', moduleTitle, next));
      setMode('downloaded');
    } catch {
      // No error dialog: the student prints to PDF instead.
      setMode('print');
    } finally {
      busyRef.current = false;
      setBusy(false);
    }
  }

  // The print dialog blocks until it closes; `afterprint` follows. Only then
  // the form button appears, as after a download.
  function print(): void {
    window.addEventListener('afterprint', () => setMode((current) => (current === 'print' ? 'printed' : current)), {
      once: true,
    });
    window.print();
  }

  const printing = mode === 'print' || mode === 'printed';
  const done = mode === 'downloaded' || mode === 'printed';
  const tone = mode === 'downloaded' ? 'success' : printing ? 'warning' : undefined;
  const openChoices = collected?.choices.filter((choice) => choice.label === '') ?? [];
  const emptyItems = collected?.items.filter((item) => !isFilled(item)) ?? [];

  // What appears after a download, or after a failed one, fades in
  // (docs/DESIGN.md, "Beweging"): the status through this effect, which runs
  // before the paint so the status does not show at full strength first; the
  // buttons and the note through `appearOnMount`. The mode is never
  // restored, so this only follows an action of the student.
  const statusRef = useRef<HTMLParagraphElement>(null);
  useLayoutEffect(() => {
    if (tone !== undefined && statusRef.current !== null) appear(statusRef.current);
  }, [tone]);

  return (
    <div ref={rootRef} className={styles.root} data-summary>
      {collected === null ? (
        <p className={styles.noScript}>Je samenvatting verschijnt hier alleen als JavaScript aanstaat in je browser.</p>
      ) : (
        <p className={styles.intro}>{intro(moduleTitle, collected.items)}</p>
      )}

      {openChoices.length + emptyItems.length > 0 && (
        <div className={styles.box} tabIndex={0} role="region" aria-labelledby={emptyTitleId}>
          <p id={emptyTitleId} className={styles.boxTitle}>
            Nog leeg:
          </p>
          <ul className={styles.list}>
            {openChoices.map((choice) => (
              <li key={`keuze:${choice.name}`} className={styles.item}>
                {choiceTitle(choice.name)}: (nog niet gekozen)
                <StepLink step={choice.step} />
              </li>
            ))}
            {emptyItems.map((item) => (
              <li key={item.id} className={styles.item}>
                {item.question}
                <StepLink step={item.step} />
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={styles.actions}>
        <button
          type="button"
          className={mode === 'idle' ? styles.primary : styles.secondary}
          aria-busy={busy}
          onClick={download}
        >
          <DownloadIcon />
          Download als pdf
        </button>
        {printing && (
          <button
            ref={appearOnMount}
            type="button"
            className={mode === 'print' ? styles.primary : styles.secondary}
            onClick={print}
          >
            <PrintIcon />
            Afdrukken
          </button>
        )}
        {done &&
          (formUrl !== null ? (
            <a ref={appearOnMount} className={styles.primary} href={formUrl} target="_blank" rel="noopener noreferrer">
              Open het eindformulier
              <ExternalIcon />
              <span className={styles.srOnly}> (opent in een nieuw tabblad)</span>
            </a>
          ) : (
            <p ref={appearOnMount} className={styles.pending}>
              De link naar het eindformulier volgt nog.
            </p>
          ))}
        <p ref={statusRef} role="status" className={styles.status} data-tone={tone}>
          {mode === 'downloaded' && (
            <>
              <CheckIcon />
              <span>
                <strong>Gedownload.</strong> Laad de pdf op in het eindformulier.
              </span>
            </>
          )}
          {printing && (
            <span>
              Downloaden lukte niet. Klik op <strong>Afdrukken</strong> en kies bij Bestemming{' '}
              <strong>Opslaan als PDF</strong>.
            </span>
          )}
        </p>
      </div>

      {collected !== null && <OnPaper moduleTitle={moduleTitle} collected={collected} />}
    </div>
  );
}
