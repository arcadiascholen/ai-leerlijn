// Texts the student reads about a module, built from its frontmatter
// (docs/BRIEFING.md § 5 and § 7). Shared by the module card in the overview
// and the module page, so both say exactly the same.
import type { CollectionEntry } from 'astro:content';

export type AiUse = CollectionEntry<'modules'>['data']['aiGebruik'];

// Whether the student uses AI, in one sentence (BRIEFING § 7). The poster of
// the AI-barometer says: no AI level mentioned, no AI. So every module states
// it, also when the answer is no. Short enough for one line on a module card;
// `voorbeelden` ("zelf geen": there is AI, the student only looks at it) is
// told apart from `geen` by its icon (an eye) in AiGebruik.astro.
export const aiUseSentence: Record<AiUse, string> = {
  zelf: 'Je gebruikt zelf AI.',
  voorbeelden: 'Je gebruikt zelf geen AI.',
  geen: 'Je gebruikt geen AI.',
};

// The highest level in stars (schema: `niveau` 1 to 4).
export const MAX_LEVEL = 4;

// "1e graad", "2e en 3e graad", "1e, 2e en 3e graad".
export function gradesLabel(grades: readonly number[]): string {
  const names = Array.from(new Set(grades))
    .sort((a, b) => a - b)
    .map((grade) => `${grade}e`);
  const last = names.pop() ?? '';
  return names.length === 0 ? `${last} graad` : `${names.join(', ')} en ${last} graad`;
}
