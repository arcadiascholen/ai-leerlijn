// Links to Smartschool (docs/BRIEFING.md § 4). The four schools work on one
// Smartschool platform, so every link is the same for every student.
// Keep them here, in one place, so they are quick to check before
// 10 November.
//
// `null` means the link is not known yet. The site then shows a clear,
// non-clickable note instead of a button ("De link … volgt nog"). Fill in
// the full https:// address as soon as it is known; the build fails on an
// address that is not a valid https URL.

// The questionnaire before the module (the baseline), for the start page.
export const nulmeting: string | null = null;

// The final form, one for all modules. Used by the summary at the end of a
// module (src/components/stappen/Samenvatting.astro), and for the start page.
export const eindformulier: string | null = null;

// Throws if a link that is filled in is not a valid https URL, so that a typo
// fails the build instead of sending students nowhere.
export function checkLink(name: string, value: string | null): string | null {
  if (value === null) return null;
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`src/config/smartschool.ts: \`${name}\` is not a valid URL: ${JSON.stringify(value)}.`);
  }
  if (url.protocol !== 'https:') {
    throw new Error(`src/config/smartschool.ts: \`${name}\` must start with https://. Got ${JSON.stringify(value)}.`);
  }
  return url.href;
}
