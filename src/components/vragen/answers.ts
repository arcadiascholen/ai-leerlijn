// Stored answers of the question components (docs/BRIEFING.md § 12).
//
// Every question has an `id` that the author writes, unique within the
// module. Its answer is stored as JSON under
// `ai-leerlijn:<module-id>:vraag:<id>`, through the helpers in
// ../stappen/storage.ts, so "Opnieuw beginnen" clears it with the rest of the
// module.
//
// In the static HTML every question's root element carries
// `data-question="<kind>"` and `data-question-id="<id>"`, also in steps that
// are hidden and not hydrated yet. The questions that the summary shows
// (`think-first`, `reflection`, `prompt-fields` and `measure`) also carry
// `data-question-text`, the question as it is on the page now, and a `measure`
// carries `data-measure-max`, the top of its score. A `choice-chat` carries
// `data-question-text` too, the title of its step, although only the timeline
// shows it. The summary at the end of a module
// (../stappen/Samenvatting.tsx) walks those elements in document order, which
// is the order of the module, and reads each answer with `readAnswer`. It
// takes the question from the page, not from storage: the stored question
// is the one the student saw, and goes stale when an author rewrites it.
//
// Every answer, of every kind, also carries two times (AnswerTimes), for the
// timeline in the PDF of the summary. `writeAnswer` sets them, not the
// components.

import { readStored, writeStored } from '../stappen/storage';

export type QuestionKind = 'multiple-choice' | 'think-first' | 'reflection' | 'prompt-fields' | 'measure' | 'choice-chat';

// <Meerkeuze>: the options the student chose, as indices into the options in
// the order the author wrote them, in the order they were chosen.
export interface MultipleChoiceAnswer {
  kind: 'multiple-choice';
  question: string;
  chosen: number[];
}

// <DenkEerst>: what the student wrote, and whether the example answer was
// shown. `question` is the question as the student saw it, so that a summary
// can show it next to the answer.
export interface ThinkFirstAnswer {
  kind: 'think-first';
  question: string;
  answer: string;
  shown: boolean;
}

// <Reflectie>: what the student wrote, with the question as they saw it.
export interface ReflectionAnswer {
  kind: 'reflection';
  question: string;
  answer: string;
}

// <Prompt velden={…}>: what the student wrote in each field, by the name of
// the placeholder it fills in. `question` is the title of the step the
// prompt is in, as the student saw it.
export interface PromptFieldsAnswer {
  kind: 'prompt-fields';
  question: string;
  fields: Record<string, string>;
}

// <Meting>: the score from 0 to `max`, and how sure the student is, from 1 to
// CONFIDENCE_MAX. Stored from the first click, so either can still be null.
export interface MeasureAnswer {
  kind: 'measure';
  question: string;
  score: number | null;
  max: number;
  confidence: number | null;
}

// <Keuzechat>: per round the messages the student chose, as indices into the
// messages in the order the author wrote them, in the order they were chosen.
// `question` is the title of the step the conversation is in, as the student
// saw it. This only checks the shape; whether the indices still fit the rounds
// on the page is for the component (Keuzechat.tsx).
export interface ChoiceChatAnswer {
  kind: 'choice-chat';
  question: string;
  chosen: number[][];
}

// What a component writes. A new kind of question goes here.
export type AnswerContent =
  | MultipleChoiceAnswer
  | ThinkFirstAnswer
  | ReflectionAnswer
  | PromptFieldsAnswer
  | MeasureAnswer
  | ChoiceChatAnswer;

// When the student first saved an answer to the question, and when last, as
// ISO 8601 (`toISOString`). Missing on an answer stored before the site kept
// times, and dropped when it is not a valid time.
export interface AnswerTimes {
  firstAt?: string;
  lastAt?: string;
}

export type StoredAnswer = AnswerContent & AnswerTimes;

export function answerKey(questionId: string): string {
  return `vraag:${questionId}`;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

// The top of the confidence row of a <Meting>, which starts at 1.
export const CONFIDENCE_MAX = 5;

// null, or a whole number from `min` to `max`.
function isChoiceInRange(value: unknown, min: number, max: number): boolean {
  return value === null || (Number.isInteger(value) && (value as number) >= min && (value as number) <= max);
}

// A time as `toISOString` writes it, or with an offset; "gisteren" is none.
const ISO_TIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:\d{2})$/;

export function isTime(value: unknown): value is string {
  return typeof value === 'string' && ISO_TIME.test(value) && !Number.isNaN(Date.parse(value));
}

// Checks the content only: the times are optional, and `readAnswer` drops an
// invalid one without dropping the answer.
function isStoredAnswer(value: unknown): value is AnswerContent & Record<string, unknown> {
  if (!isRecord(value) || typeof value.question !== 'string') return false;
  switch (value.kind) {
    case 'multiple-choice':
      return Array.isArray(value.chosen) && value.chosen.every((index) => Number.isInteger(index));
    case 'think-first':
      return typeof value.answer === 'string' && typeof value.shown === 'boolean';
    case 'reflection':
      return typeof value.answer === 'string';
    case 'prompt-fields':
      return (
        isRecord(value.fields) &&
        !Array.isArray(value.fields) &&
        Object.values(value.fields).every((field) => typeof field === 'string')
      );
    case 'measure':
      return (
        Number.isInteger(value.max) &&
        (value.max as number) >= 1 &&
        isChoiceInRange(value.score, 0, value.max as number) &&
        isChoiceInRange(value.confidence, 1, CONFIDENCE_MAX)
      );
    case 'choice-chat':
      return (
        Array.isArray(value.chosen) &&
        value.chosen.every((round) => Array.isArray(round) && round.every((index) => Number.isInteger(index)))
      );
    default:
      return false;
  }
}

// The stored answer of one question, or null if there is none, if storage is
// blocked, or if the value is not a valid answer (edited by hand, or from an
// older version of the site). A time that is not valid counts as no time.
export function readAnswer(moduleId: string, questionId: string): StoredAnswer | null {
  const raw = readStored(moduleId, answerKey(questionId));
  if (raw === null) return null;
  try {
    const value: unknown = JSON.parse(raw);
    if (!isStoredAnswer(value)) return null;
    const { firstAt, lastAt, ...content } = value;
    return {
      ...(content as AnswerContent),
      ...(isTime(firstAt) ? { firstAt } : {}),
      ...(isTime(lastAt) ? { lastAt } : {}),
    };
  } catch {
    return null;
  }
}

// Stores `answer` with its times: `firstAt` stays what it was, or becomes now
// on the first save, and `lastAt` becomes now. So `firstAt` stays the moment
// the student started on the question, although <Reflectie> saves on every
// keystroke.
export function writeAnswer(moduleId: string, questionId: string, answer: AnswerContent): void {
  const now = new Date().toISOString();
  const firstAt = readAnswer(moduleId, questionId)?.firstAt ?? now;
  const stored: StoredAnswer = { ...answer, firstAt, lastAt: now };
  writeStored(moduleId, answerKey(questionId), JSON.stringify(stored));
}

// What a <Meting> holds now: its `element` is the root in the static HTML, also
// in a step that is hidden and not hydrated yet. A score stored on another
// scale (an author changed `max` after publishing) counts as not chosen: "3 van
// 5" says nothing about a row up to 10.
export interface MeasureValues {
  readonly score: number | null;
  readonly max: number;
  readonly confidence: number | null;
}

export function readMeasure(moduleId: string, element: HTMLElement): MeasureValues {
  const max = Number(element.dataset.measureMax);
  const stored = readAnswer(moduleId, element.dataset.questionId ?? '');
  if (stored?.kind !== 'measure') return { score: null, max, confidence: null };
  return { score: stored.max === max ? stored.score : null, max, confidence: stored.confidence };
}
