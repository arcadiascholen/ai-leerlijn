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
// are hidden and not hydrated yet. A component that collects answers (the
// summary at the end of a module) walks those elements in document order,
// which is the order of the module, and reads each answer with `readAnswer`.

import { readStored, writeStored } from '../stappen/storage';

export type QuestionKind = 'multiple-choice' | 'think-first';

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

export type StoredAnswer = MultipleChoiceAnswer | ThinkFirstAnswer;

export function answerKey(questionId: string): string {
  return `vraag:${questionId}`;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isStoredAnswer(value: unknown): value is StoredAnswer {
  if (!isRecord(value) || typeof value.question !== 'string') return false;
  switch (value.kind) {
    case 'multiple-choice':
      return Array.isArray(value.chosen) && value.chosen.every((index) => Number.isInteger(index));
    case 'think-first':
      return typeof value.answer === 'string' && typeof value.shown === 'boolean';
    default:
      return false;
  }
}

// The stored answer of one question, or null if there is none, if storage is
// blocked, or if the value is not a valid answer (edited by hand, or from an
// older version of the site).
export function readAnswer(moduleId: string, questionId: string): StoredAnswer | null {
  const raw = readStored(moduleId, answerKey(questionId));
  if (raw === null) return null;
  try {
    const value: unknown = JSON.parse(raw);
    return isStoredAnswer(value) ? value : null;
  } catch {
    return null;
  }
}

export function writeAnswer(moduleId: string, questionId: string, answer: StoredAnswer): void {
  writeStored(moduleId, answerKey(questionId), JSON.stringify(answer));
}
