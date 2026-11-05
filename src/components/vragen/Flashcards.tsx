import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { appear } from '../../lib/motion';
import { moduleIdOf } from '../stappen/storage';
import { readAnswer, writeAnswer, type FlashcardsContent } from './answers';
import { firstTimeRight, hardest, MAX_CARDS, newRound, NO_FLASHCARDS, viewOf } from './flashcards';
import styles from './Flashcards.module.css';

// Practising with a deck of one's own (docs/BRIEFING.md § 12, "Vraagtypes"). Three
// screens: paste the list, practise, the overview at the end. While practising,
// the student first answers, then turns the card over, then scores themselves: no
// tool forces that order. "Nog niet" puts the card at the back.
//
// Everything is stored on every change, also the answer being typed and whether
// the card is turned over, so that a reload gives the same card, the same text and
// the same order. The logic is in flashcards.ts.

declare global {
  interface Window {
    // Set by Flashcards.astro: the ids of the decks whose example button was
    // clicked before hydration.
    flashcardsExampleClicks?: Set<string>;
  }
}

interface Props {
  readonly id: string;
  readonly question: string;
  // The example deck of the author, as lines; '' without one.
  readonly example: string;
}

// Where the focus goes after an action of the student, and only then.
type FocusTarget = 'paste' | 'start' | 'answer' | 'back' | 'overview';

const NO_SCRIPT = 'Deze oefening met kaarten heeft JavaScript nodig. Zet het aan in je browser om ze te gebruiken.';

function cardsLabel(count: number): string {
  return `${count} ${count === 1 ? 'kaart' : 'kaarten'}`;
}

export default function Flashcards({ id, question, example }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const moduleIdRef = useRef<string | null>(null);
  const pasteRef = useRef<HTMLTextAreaElement>(null);
  const startRef = useRef<HTMLButtonElement>(null);
  const answerRef = useRef<HTMLTextAreaElement>(null);
  const backRef = useRef<HTMLElement | null>(null);
  const overviewRef = useRef<HTMLHeadingElement>(null);
  const focusRef = useRef<FocusTarget | null>(null);
  const [content, setContent] = useState<FlashcardsContent>(NO_FLASHCARDS);
  // A new key for the board per card: the old card goes at once, the new one
  // fades in. Not stored: it only follows an action.
  const [turn, setTurn] = useState(0);
  // Set by the student's first action: what mounts after it fades in. What is
  // restored simply stands there (docs/DESIGN.md, "Beweging").
  const actedRef = useRef(false);
  const appearIfActed = useCallback((element: HTMLElement | null) => {
    if (element !== null && actedRef.current) appear(element);
  }, []);
  const setBack = useCallback(
    (element: HTMLElement | null) => {
      backRef.current = element;
      appearIfActed(element);
    },
    [appearIfActed],
  );

  const view = viewOf(content);
  const round = view.round;
  const running = round !== null && round.queue.length > 0;
  const currentIndex = running ? round.queue[0] : undefined;
  const card = currentIndex === undefined ? undefined : view.cards[currentIndex];
  const baseId = `kaarten-${id}`;

  function save(next: FlashcardsContent): void {
    if (moduleIdRef.current !== null) writeAnswer(moduleIdRef.current, id, { kind: 'flashcards', question, ...next });
  }

  function change(next: FlashcardsContent, focus?: FocusTarget): void {
    actedRef.current = true;
    focusRef.current = focus ?? null;
    setContent(next);
    save(next);
  }

  // Restore after hydration, not during render: the server renders an empty paste
  // screen, and the first client render has to match it. What the student did
  // before hydration is newer than what is stored, so it is not lost: typed text
  // wins, and stays on the paste screen, where a round of another deck does not
  // count. A click on the example deck only fills an empty field. The field has
  // autocomplete="off", so the browser does not restore old text into it.
  useEffect(() => {
    const root = rootRef.current;
    if (root === null) return;
    const moduleId = moduleIdOf(root);
    moduleIdRef.current = moduleId;
    const stored = moduleId === null ? null : readAnswer(moduleId, id);
    const restored: FlashcardsContent = stored?.kind === 'flashcards' ? stored : NO_FLASHCARDS;
    const typed = pasteRef.current?.value ?? '';
    const clicked = example !== '' && window.flashcardsExampleClicks?.has(id) === true;
    let next = restored;
    if (typed.trim() !== '') next = { ...restored, text: typed, screen: 'paste' };
    else if (clicked && restored.text.trim() === '') next = { ...restored, text: example, screen: 'paste' };
    const seen = viewOf(next);
    // What does not fit the cards goes; a round of another deck stays until the
    // student starts on this one, so that undoing an edit brings it back.
    const clean = seen.sameDeck
      ? { ...next, screen: seen.screen, round: seen.round, last: seen.last }
      : { ...next, screen: seen.screen };
    setContent(clean);
    if (next !== restored) save(clean);
  }, [id, example]);

  // Only after an action of the student: showing the step again, or a restore,
  // never moves the focus.
  useEffect(() => {
    const target = focusRef.current;
    if (target === null) return;
    focusRef.current = null;
    const elements = {
      paste: pasteRef,
      start: startRef,
      answer: answerRef,
      back: backRef,
      overview: overviewRef,
    };
    elements[target].current?.focus();
  });

  // A new round with a new order. The last finished round keeps counting until
  // this one is finished, if it is about these cards.
  function practise(): void {
    if (view.cards.length === 0) return;
    setTurn((value) => value + 1);
    change(
      {
        ...content,
        screen: 'practice',
        practised: content.text,
        round: newRound(view.cards.length, view.sameDeck ? round?.order : undefined),
        last: view.sameDeck ? view.last : null,
        scored: view.sameDeck && view.scored,
      },
      'answer',
    );
  }

  // From the paste screen: on with the running round if the deck is the same.
  function start(): void {
    if (view.sameDeck && running) change({ ...content, screen: 'practice' }, 'answer');
    else practise();
  }

  function edit(): void {
    change({ ...content, screen: 'paste' }, 'paste');
  }

  function fillExample(): void {
    change({ ...content, text: example }, 'start');
  }

  function type(typed: string): void {
    if (round !== null) change({ ...content, round: { ...round, typed } });
  }

  function flip(): void {
    if (round === null || round.typed.trim() === '') return;
    change({ ...content, round: { ...round, flipped: true } }, 'back');
  }

  function onAnswerKey(event: KeyboardEvent<HTMLTextAreaElement>): void {
    if (event.key !== 'Enter' || event.shiftKey || event.ctrlKey || event.altKey || event.metaKey) return;
    if (event.nativeEvent.isComposing) return;
    // Enter never makes a new line here, also not while it does nothing else. A
    // held Enter does not count: it would still be held from the card before.
    event.preventDefault();
    if (!event.repeat) flip();
  }

  function score(known: boolean): void {
    if (round === null || currentIndex === undefined) return;
    const misses = round.misses.map((count, index) => (!known && index === currentIndex ? count + 1 : count));
    const rest = round.queue.slice(1);
    const queue = known ? rest : [...rest, currentIndex];
    const next = { ...content, round: { ...round, queue, misses, typed: '', flipped: false }, scored: true };
    setTurn((value) => value + 1);
    if (queue.length === 0) change({ ...next, screen: 'done', last: misses }, 'overview');
    else change(next, 'answer');
  }

  const typedAnswer = round?.typed ?? '';
  const flipped = round?.flipped === true;
  let startLabel = 'Begin met oefenen';
  if (view.sameDeck && running) startLabel = 'Verder oefenen';
  else if (view.sameDeck && view.last !== null) startLabel = 'Opnieuw oefenen';

  const secondary = (
    <div className={styles.quiet}>
      <button type="button" className={styles.secondary} onClick={practise}>
        Opnieuw oefenen
      </button>
      <button type="button" className={styles.secondary} onClick={edit}>
        Stapel aanpassen
      </button>
    </div>
  );

  return (
    <div ref={rootRef} className={styles.root} data-question="flashcards" data-question-id={id} data-question-text={question}>
      <div className={styles.head}>
        <h3 className={styles.question}>{question}</h3>
        {view.screen === 'practice' && (
          <p className={styles.counter}>
            {view.cards.length - (round?.queue.length ?? 0)} van {cardsLabel(view.cards.length)} op Wist ik
          </p>
        )}
      </div>
      <p className={styles.noScript}>{NO_SCRIPT}</p>

      {view.screen === 'paste' && (
        <div key="paste" ref={appearIfActed} className={styles.app}>
          <div className={styles.board} data-columns="2">
            <div className={styles.pasteColumn}>
              <label htmlFor={`${baseId}-lijst`} className={styles.fieldLabel}>
                Plak je kaarten, één per regel: vraag | antwoord
              </label>
              <textarea
                ref={pasteRef}
                id={`${baseId}-lijst`}
                className={styles.pasteField}
                rows={5}
                placeholder="Wat is de hoofdstad van Peru? | Lima"
                autoComplete="off"
                spellCheck={false}
                value={content.text}
                onChange={(event) => change({ ...content, text: event.target.value })}
              />
            </div>
            <div className={styles.readout}>
              <p role="status" className={styles.count}>
                {view.cards.length === 0 ? 'Nog geen kaarten' : cardsLabel(view.cards.length)}
              </p>
              {view.dropped > 0 && (
                <p className={styles.note}>
                  Alleen de eerste {MAX_CARDS} tellen mee: {cardsLabel(view.dropped)} {view.dropped === 1 ? 'valt' : 'vallen'} weg.
                </p>
              )}
              {view.changed && <p className={styles.note}>Je stapel is gewijzigd: de oefening begint opnieuw.</p>}
              <p className={styles.note}>Kijk je kaarten na in je bron voor je begint.</p>
              {view.unreadable.length > 0 && (
                <div className={styles.unreadable} tabIndex={0} role="region" aria-labelledby={`${baseId}-niet`}>
                  <p id={`${baseId}-niet`} className={styles.unreadableTitle}>
                    {view.unreadable.length} {view.unreadable.length === 1 ? 'regel' : 'regels'} begreep ik niet. Een
                    inleidende zin van de AI mag je negeren.
                  </p>
                  <ul className={styles.unreadableList} role="list">
                    {view.unreadable.map((line, index) => (
                      <li key={index}>{line}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className={styles.actions}>
            <button
              ref={startRef}
              type="button"
              className={styles.primary}
              disabled={view.cards.length === 0}
              onClick={start}
            >
              {startLabel}
            </button>
            {example !== '' && content.text.trim() === '' && (
              <button type="button" className={styles.secondary} data-flashcards-example onClick={fillExample}>
                Oefen met de voorbeeldstapel
              </button>
            )}
          </div>
        </div>
      )}

      {view.screen === 'practice' && card !== undefined && (
        <div className={styles.app}>
          <div key={turn} ref={appearIfActed} className={styles.board} data-columns="3">
            <section className={styles.panel} aria-labelledby={`${baseId}-voorkant`}>
              <p id={`${baseId}-voorkant`} className={styles.label}>
                Voorkant
              </p>
              <p id={`${baseId}-vraag`} className={styles.cardText}>
                {card.front}
              </p>
            </section>
            {flipped ? (
              <section className={styles.panel} aria-labelledby={`${baseId}-jouw`}>
                <p id={`${baseId}-jouw`} className={styles.label}>
                  Jouw antwoord
                </p>
                <p id={`${baseId}-eigen`} className={styles.cardText}>
                  {typedAnswer}
                </p>
              </section>
            ) : (
              <div className={styles.answerColumn}>
                <label htmlFor={`${baseId}-antwoord`} className={styles.label}>
                  Jouw antwoord
                </label>
                <textarea
                  ref={answerRef}
                  id={`${baseId}-antwoord`}
                  className={styles.answerField}
                  rows={2}
                  autoComplete="off"
                  value={typedAnswer}
                  onChange={(event) => type(event.target.value)}
                  onKeyDown={onAnswerKey}
                  aria-describedby={`${baseId}-vraag ${baseId}-uitleg`}
                />
                <p id={`${baseId}-uitleg`} className={styles.note}>
                  Typ eerst je antwoord. Enter draait om, Shift+Enter is een nieuwe regel.
                </p>
              </div>
            )}
            {flipped ? (
              // Read out in one go when the focus lands here. The focus does not go
              // to "Wist ik", so that a second Enter does not score by accident.
              <section
                ref={setBack}
                className={styles.panel}
                tabIndex={-1}
                aria-labelledby={`${baseId}-jouw ${baseId}-eigen ${baseId}-achterkant ${baseId}-terug`}
              >
                <p id={`${baseId}-achterkant`} className={styles.label}>
                  Achterkant
                </p>
                <p id={`${baseId}-terug`} className={styles.cardText}>
                  {card.back}
                </p>
              </section>
            ) : (
              <p className={styles.placeholder}>Hier verschijnt de achterkant als je de kaart omdraait.</p>
            )}
          </div>
          <div className={styles.actions}>
            {flipped ? (
              <>
                <button type="button" className={styles.primary} onClick={() => score(true)}>
                  Wist ik
                </button>
                <button type="button" className={styles.primary} onClick={() => score(false)}>
                  Nog niet
                </button>
              </>
            ) : (
              <button type="button" className={styles.primary} disabled={typedAnswer.trim() === ''} onClick={flip}>
                Draai om
              </button>
            )}
            {secondary}
          </div>
        </div>
      )}

      {view.screen === 'done' && view.last !== null && (
        <div key="done" ref={appearIfActed} className={styles.app}>
          <div className={styles.overview}>
            <h4 ref={overviewRef} className={styles.overviewTitle} tabIndex={-1}>
              Klaar! {firstTimeRight(view.last)} van {cardsLabel(view.cards.length)}{' '}
              {firstTimeRight(view.last) === 1 ? 'was' : 'waren'} meteen goed.
            </h4>
            <p className={styles.label}>Moeilijkste kaarten</p>
            {hardest(view.cards, view.last).length === 0 ? (
              <p className={styles.none}>geen</p>
            ) : (
              <ol className={styles.hardest} role="list" tabIndex={0} aria-label="Moeilijkste kaarten">
                {hardest(view.cards, view.last).map((hard, index) => (
                  <li key={index}>
                    {hard.front} <span className={styles.misses}>({hard.misses} keer nog niet)</span>
                  </li>
                ))}
              </ol>
            )}
          </div>
          <div className={styles.actions}>
            <button type="button" className={styles.primary} onClick={practise}>
              Opnieuw oefenen
            </button>
            <button type="button" className={styles.secondary} onClick={edit}>
              Stapel aanpassen
            </button>
            <p className={styles.keep}>
              De stapel blijft in deze browser. <em>Opnieuw beginnen</em> wist ze ook.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
