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
// (`think-first`, `reflection` and `prompt-fields`) also carry
// `data-question-text`, the question as it is on the page now. The summary at the end of a module
// (../stappen/Samenvatting.tsx) walks those elements in document order, which
// is the order of the module, and reads each answer with `readAnswer`. It
// takes the question from the page, not from storage: the stored question
// is the one the student saw, and goes stale when an author rewrites it.
//
// Every answer, of every kind, also carries two times (AnswerTimes), for the
// timeline in the PDF of the summary. `writeAnswer` sets them, not the
// components.

import { readStored, writeStored } from '../stappen/storage';

export type QuestionKind = 'multiple-choice' | 'think-first' | 'reflection' | 'prompt-fields';

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

// What a component writes. A new kind of question goes here.
export type AnswerContent = MultipleChoiceAnswer | ThinkFirstAnswer | ReflectionAnswer | PromptFieldsAnswer;

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
