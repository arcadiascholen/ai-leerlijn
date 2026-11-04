// Links to Smartschool (docs/BRIEFING.md § 4), and the hour by which the
// final form is due. Keep them here, in one place, so they are quick to check
// before 10 November.
//
// Each of the four schools has its own Smartschool platform, so a link can
// exist four times. Such a link is written as a template with `{school}` where
// the platform goes; <SchoolLink> asks the student for the school
// (src/components/stappen/SchoolLink.astro).
//
// `null` means the value is not known yet. The site then shows a clear,
// non-clickable note instead of a button ("De link … volgt nog"). Fill in
// the full https:// address as soon as it is known; the build fails on an
// address that is not a valid https URL.

// The schools as the student knows them, and the platform of each: the
// subdomain on smartschool.be, and the value of `smartschool_platform` on
// Bookwidgets.
export const schools = [
  { label: 'SMA', platform: 'sanctamaria-aarschot' },
  { label: 'DIA', platform: 'dia' },
  { label: 'SJIB', platform: 'sjib' },
  { label: 'SJCA', platform: 'sjca' },
] as const;

// The questionnaire before the module (the baseline), a template. Step 1 on
// the start page (src/pages/index.astro).
export const nulmeting: string | null =
  'https://{school}.smartschool.be/forms/form/3617/8e7c06b3-f89c-4bfa-8d36-758298a7b329';

// The final form, one for all modules. Step 3 on the start page, and the
// summary at the end of a module (src/components/stappen/Samenvatting.astro).
export const eindformulier: string | null = null;

// The hour on Tuesday 10 November by which the final form is due, written as
// the student reads it, e.g. '16 uur' or '16.30 uur'. Shown on the start
// page. Still an open decision (docs/BRIEFING.md § 11).
export const eindformulierUur: string | null = null;

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

export interface SchoolLinkTarget {
  label: string;
  platform: string;
  url: string;
}

// The address of a template for each school. `new URL` accepts `{school}`, also
// in the host name, so a forgotten or misspelled placeholder has to be caught
// here: it would send students to a page that does not exist, without an error.
export function schoolLinks(template: string): SchoolLinkTarget[] {
  if (!template.includes('{school}')) {
    throw new Error(`A school link needs \`{school}\` where the platform goes. Got ${JSON.stringify(template)}.`);
  }
  return schools.map(({ label, platform }) => {
    const filled = template.replaceAll('{school}', platform);
    if (/[{}]/.test(filled)) {
      throw new Error(`A school link may only have \`{school}\` as a placeholder. Got ${JSON.stringify(template)}.`);
    }
    return { label, platform, url: checkLink('school link', filled) as string };
  });
}
