import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Schema for the `modules` collection (BRIEFING § 5). Field names are Dutch
// because authors and the briefing use them; code identifiers stay English.
//
// `.strict()` makes an unknown key an error. Without it zod silently strips
// unknown keys, so a typo such as `nivau: 2` would drop the field instead of
// failing the build.
//
// One file per version of a module (e.g. `ai-als-coach-2e-graad.mdx` and
// `ai-als-coach-3e-graad.mdx`), each with its own `graden` and `niveau`.
const modules = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/modules' }),
  schema: z
    .object({
      title: z.string().min(1),
      // One sentence describing what the student does in the module.
      kort: z.string().min(1),
      graden: z.array(z.literal([1, 2, 3])).min(1),
      // Difficulty in stars.
      niveau: z.number().int().min(1).max(4),
      // Minutes.
      duur: z.number().int().positive().default(70),
      // `zelf`: the student uses AI; `voorbeelden`: the student looks at
      // prepared conversations; `geen`: no AI.
      aiGebruik: z.enum(['zelf', 'voorbeelden', 'geen']),
      // Which of the four goals (BRIEFING § 1) the module covers.
      doelen: z.array(z.number().int().min(1).max(4)).min(1),
      // `binnenkort` modules are listed but get no page.
      status: z.enum(['binnenkort', 'beschikbaar']),
      // Position in the overview, ascending.
      volgorde: z.number().int(),
    })
    .strict(),
});

export const collections = { modules };
