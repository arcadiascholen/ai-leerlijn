import { useCallback, useEffect, useRef, useState } from 'react';
import { appear, settle } from '../../lib/motion';
import { moduleIdOf } from '../stappen/storage';
import { readAnswer, writeAnswer } from '../vragen/answers';
import type { ChoiceChatRound, Turn } from './authoring';
import styles from './Keuzechat.module.css';

// A conversation in which the student chooses the next message (docs/BRIEFING.md
// § 12, "Prompts en gesprekken"). On the left the conversation, on the right the
// question of the open round and its messages, with the feedback below them. A
// chosen message stays and no longer works, and it and the AI's reply go into
// the conversation. A message with `good` opens the next round; after another
// one the student chooses again. "Volgende" does not wait for any of this.
//
// Everything follows from `chosen`: which round is open, what the conversation
// holds, and which feedback shows. So a reload gives the same picture, in the
// order of choosing.

interface Props {
  readonly id: string;
  // The title of the step: the question of the answer, for the timeline.
  readonly question: string;
  readonly turns: readonly Turn[];
  readonly rounds: readonly ChoiceChatRound[];
}

// The longest prefix of `stored` that the student can have reached with these
// rounds, in case the author changed them after publishing: an index that no
// longer exists goes, as does anything after the message that opened the next
// round, and a round can only follow a round that opened it.
function consistent(stored: readonly (readonly number[])[], rounds: readonly ChoiceChatRound[]): number[][] {
  const result: number[][] = [];
  for (const [position, round] of rounds.entries()) {
    const list: number[] = [];
    let opened = false;
    for (const index of stored[position] ?? []) {
      const message = round.messages[index];
      if (message === undefined || list.includes(index)) continue;
      list.push(index);
      if (message.good) {
        opened = true;
        break;
      }
    }
    if (list.length > 0) result.push(list);
    if (!opened) break;
  }
  return result;
}

// A chosen message, as the conversation and the feedback need it.
interface Choice {
  readonly round: number;
  readonly index: number;
  readonly html: string;
  readonly good: boolean;
  readonly reply: string;
  readonly feedback: string;
}

// `chosen` is consistent, so round by round is the order of choosing.
function choicesOf(chosen: readonly (readonly number[])[], rounds: readonly ChoiceChatRound[]): Choice[] {
  return chosen.flatMap((list, round) =>
    list.flatMap((index) => {
      const message = rounds[round]?.messages[index];
      return message === undefined ? [] : [{ round, index, ...message }];
    }),
  );
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

const VERDICT_GOOD = 'Dit helpt';
const VERDICT_WEAK = 'Dit helpt minder';
const DONE = 'Het gesprek is klaar, je kunt verder met de volgende stap.';

export default function Keuzechat({ id, question, turns, rounds }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const moduleIdRef = useRef<string | null>(null);
  const [chosen, setChosen] = useState<number[][]>([]);
  // Read out by a screen reader after a choice, not after a restore. What it
  // says is on the screen too, in a place that is not a live region itself.
  const [announcement, setAnnouncement] = useState('');
  // True from the render that shows the restored choices, if any.
  const [restored, setRestored] = useState(false);
  // Set by the student's first choice: what mounts after it fades in. What is
  // restored simply stands there (docs/DESIGN.md, "Beweging").
  const choseRef = useRef(false);
  const appearIfChosen = useCallback((element: HTMLElement | null) => {
    if (element !== null && choseRef.current) appear(element);
  }, []);
  // The buttons of a round disappear when it is done, so the focus goes to what
  // comes next: the question of the next round, or the closing sentence.
  const focusRef = useRef<HTMLParagraphElement>(null);
  const moveFocusRef = useRef(false);

  const choices = choicesOf(chosen, rounds);
  const open = chosen.filter((list, round) => list.some((index) => rounds[round]?.messages[index]?.good === true)).length;
  const round = rounds[open];
  const inOpenRound = chosen[open] ?? [];
  const latest = choices.at(-1);

  // Restore after hydration, not during render: the server renders the start
  // of the conversation, and the first client render has to match it.
  useEffect(() => {
    setRestored(true);
    const moduleId = rootRef.current === null ? null : moduleIdOf(rootRef.current);
    moduleIdRef.current = moduleId;
    if (moduleId === null) return;
    const stored = readAnswer(moduleId, id);
    if (stored?.kind !== 'choice-chat') return;
    setChosen(consistent(stored.chosen, rounds));
  }, [id, rounds]);

  // The messages change colour when the student chooses, not when the restored
  // choices appear.
  useEffect(() => {
    if (restored && rootRef.current !== null) settle(rootRef.current);
  }, [restored]);

  // The last message in view: whenever the conversation grows, also by a
  // restore or a font that loads, and whenever its box gets a size. Setting
  // scrollTop does nothing in a hidden step (the player switches with `hidden`),
  // and leaving a step can lose the position, so this has to run when the step
  // is shown again, which a ResizeObserver on the box reports. A reply taller
  // than the box stays readable from its first line.
  useEffect(() => {
    const box = boxRef.current;
    const list = listRef.current;
    if (box === null || list === null) return;
    const toLast = (): void => {
      const last = list.lastElementChild;
      if (box.clientHeight === 0 || !(last instanceof HTMLElement)) return;
      box.scrollTop = Math.min(box.scrollHeight - box.clientHeight, last.offsetTop);
    };
    const observer = new ResizeObserver(toLast);
    observer.observe(box);
    observer.observe(list);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!moveFocusRef.current) return;
    moveFocusRef.current = false;
    focusRef.current?.focus();
  }, [open]);

  function choose(index: number): void {
    const message = round?.messages[index];
    if (message === undefined || inOpenRound.includes(index)) return;
    choseRef.current = true;
    moveFocusRef.current = message.good;
    const next = [...chosen.slice(0, open), [...inOpenRound, index]];
    setChosen(next);
    setAnnouncement(`De AI antwoordt: ${message.reply} ${message.good ? VERDICT_GOOD : VERDICT_WEAK}. ${message.feedback}`);
    if (moduleIdRef.current !== null) {
      writeAnswer(moduleIdRef.current, id, { kind: 'choice-chat', question, chosen: next });
    }
  }

  return (
    <div ref={rootRef} className={styles.root} data-question="choice-chat" data-question-id={id} data-question-text={question}>
      {/* Focusable, so that the keyboard can scroll it. Not a live region: the
          status below says what a screen reader needs to hear, once. */}
      <div ref={boxRef} className={styles.box} tabIndex={0} role="group" aria-label="Gesprek">
        <ol ref={listRef} className={styles.turns} role="list">
          {turns.map((turn, index) => (
            <li key={index} className={styles.turn} data-speaker={turn.speaker}>
              <p className={styles.label}>{turn.speaker === 'jij' ? 'Jij' : 'AI'}</p>
              <div className={styles.body} dangerouslySetInnerHTML={{ __html: turn.html }} />
            </li>
          ))}
          {choices.flatMap((choice) => [
            <li key={`${choice.round}-${choice.index}-jij`} ref={appearIfChosen} className={styles.turn} data-speaker="jij">
              <p className={styles.label}>Jij</p>
              <div className={styles.body} dangerouslySetInnerHTML={{ __html: choice.html }} />
            </li>,
            <li key={`${choice.round}-${choice.index}-ai`} ref={appearIfChosen} className={styles.turn} data-speaker="ai">
              <p className={styles.label}>AI</p>
              <div className={styles.body}>
                <p>{choice.reply}</p>
              </div>
            </li>,
          ])}
        </ol>
      </div>

      <div>
        {/* A new key per round: the old buttons go at once, the new round fades in. */}
        <div key={open} ref={appearIfChosen}>
          {round === undefined ? (
            <p ref={focusRef} className={styles.question} tabIndex={-1}>
              {DONE}
            </p>
          ) : (
            <>
              <p ref={focusRef} className={styles.question} tabIndex={-1}>
                {round.question}
              </p>
              <ul className={styles.messages} role="list" aria-label={round.question}>
                {round.messages.map((message, index) => {
                  const isChosen = inOpenRound.includes(index);
                  return (
                    <li key={index} className={styles.item}>
                      {/* aria-disabled and not disabled: a disabled button would
                          drop the focus of a student on the keyboard. */}
                      <button
                        type="button"
                        className={styles.message}
                        aria-disabled={isChosen ? true : undefined}
                        data-chosen={isChosen ? '' : undefined}
                        onClick={() => choose(index)}
                      >
                        <span dangerouslySetInnerHTML={{ __html: message.html }} />
                        {isChosen && <span className={styles.tag}> Gekozen</span>}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>

        {latest !== undefined && (
          <p
            key={`${latest.round}-${latest.index}`}
            ref={appearIfChosen}
            className={styles.feedback}
            data-verdict={latest.good ? 'good' : 'weak'}
          >
            <span className={styles.verdict}>
              {latest.good ? <CheckIcon /> : <CrossIcon />}
              {latest.good ? VERDICT_GOOD : VERDICT_WEAK}
              <span className={styles.srOnly}>.</span>
            </span>{' '}
            {latest.feedback}
          </p>
        )}

        {/* Without JavaScript every question and its messages are on the page,
            without replies. React does not render this on the client, so it
            cannot differ from what the server rendered. */}
        {rounds.length > 1 && (
          <noscript>
            {rounds.slice(1).map((later, position) => (
              <div key={position} className={styles.later}>
                <p className={styles.question}>{later.question}</p>
                <ul className={styles.messages} role="list" aria-label={later.question}>
                  {later.messages.map((message, index) => (
                    <li key={index} className={styles.item}>
                      <button type="button" className={styles.message} dangerouslySetInnerHTML={{ __html: message.html }} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </noscript>
        )}

        <p role="status" className={styles.srOnly}>
          {announcement}
        </p>
      </div>
    </div>
  );
}
