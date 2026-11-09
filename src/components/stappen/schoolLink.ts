// The behaviour of <SchoolLink> (SchoolLink.astro; docs/BRIEFING.md § 12,
// "Een link per school"), in one place for the page and for React islands.
//
// SchoolLink.astro wires every link in the page once, at load. That misses a
// <SchoolLink> inside an island: the island gets it as children from its
// .astro wrapper, and React may put it in the page later (a screen that
// mounts after a choice, a button that appears after a download). On a page
// where every <SchoolLink> is inside an island, Astro may not even run the
// script of SchoolLink.astro. So the island wires its own link after React
// put it in the page (SchoolLinkSlot.tsx), with the same functions.

import { readSchool, writeSchool } from './storage';

const EXPLAIN = {
  ask: 'Daarna gaat de link open in een nieuw tabblad. Je keuze blijft bewaard in deze browser.',
  change: 'Je keuze blijft bewaard in deze browser.',
};
const TITLE = { ask: 'Van welke school ben je?', change: 'Wijzig je school' };

// Sent on `window` when the student chose a school, so that every school link
// in the page shows it, also the ones of an island.
const CHANGED = 'ai-leerlijn:school-change';

// Every link is wired once, also when the page script and an island both find
// it. By element, not by an attribute: React may rebuild a link from HTML that
// was copied after the page script wired it, attributes and all.
const wired = new WeakSet<HTMLElement>();

function part<T extends Element>(root: Element, selector: string): T {
  const found = root.querySelector<T>(selector);
  if (found === null) throw new Error(`SchoolLink: ${selector} is missing.`);
  return found;
}

// Wires one `[data-school-link]`. Returns the function that unwires it, for an
// island whose link leaves the page.
export function initSchoolLink(root: HTMLElement): () => void {
  if (wired.has(root)) return () => {};
  wired.add(root);
  const controller = new AbortController();
  const { signal } = controller;

  const ask = part<HTMLButtonElement>(root, '[data-school-ask]');
  const go = part<HTMLAnchorElement>(root, '[data-school-go]');
  const current = part<HTMLElement>(root, '[data-school-current]');
  const label = part<HTMLElement>(root, '[data-school-label]');
  const change = part<HTMLButtonElement>(root, '[data-school-change]');
  const dialog = part<HTMLDialogElement>(root, '[data-school-dialog]');
  const title = part<HTMLElement>(root, '[data-school-title]');
  const explain = part<HTMLElement>(root, '[data-school-explain]');
  const options = [...dialog.querySelectorAll<HTMLAnchorElement>('[data-platform]')];

  // Shows the stored school, and returns its link. A stored value that is
  // not one of the schools counts as no choice.
  function refresh(): HTMLAnchorElement | null {
    const stored = readSchool();
    const chosen = options.find((option) => option.dataset.platform === stored) ?? null;
    ask.hidden = chosen !== null;
    go.hidden = chosen === null;
    current.hidden = chosen === null;
    if (chosen !== null) {
      go.href = chosen.href;
      label.textContent = chosen.dataset.label ?? '';
    }
    for (const option of options) {
      if (option === chosen) option.setAttribute('aria-current', 'true');
      else option.removeAttribute('aria-current');
    }
    return chosen;
  }

  function open(mode: 'ask' | 'change'): void {
    dialog.dataset.mode = mode;
    title.textContent = TITLE[mode];
    explain.textContent = EXPLAIN[mode];
    dialog.showModal();
  }

  ask.addEventListener('click', () => open('ask'), { signal });
  change.addEventListener('click', () => open('change'), { signal });

  // The school may have changed in another tab since the page loaded: this
  // reads it again and sets the address before the browser follows the link.
  go.addEventListener(
    'click',
    (event) => {
      if (refresh() === null) {
        event.preventDefault();
        open('ask');
      }
    },
    { signal },
  );

  for (const option of options) {
    option.addEventListener(
      'click',
      (event) => {
        // Changing the school opens nothing; otherwise the link just goes on.
        if (dialog.dataset.mode === 'change') event.preventDefault();
        writeSchool(option.dataset.platform ?? '');
        dialog.close();
        window.dispatchEvent(new Event(CHANGED));
        // The button that opened the dialog may be hidden by now.
        (go.hidden ? ask : go).focus();
      },
      { signal },
    );
  }

  // The step player switches steps on the arrow keys, unless a component
  // calls preventDefault() (BRIEFING § 12); behind a dialog nothing moves.
  dialog.addEventListener(
    'keydown',
    (event) => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') event.preventDefault();
    },
    { signal },
  );

  window.addEventListener(CHANGED, () => refresh(), { signal });
  // Back to this page from the browser's cache, with a school chosen elsewhere.
  window.addEventListener('pageshow', () => refresh(), { signal });

  refresh();
  return () => {
    controller.abort();
    wired.delete(root);
  };
}

// Wires every school link in `scope`. Returns the function that unwires them.
export function initSchoolLinks(scope: ParentNode): () => void {
  const stops = Array.from(scope.querySelectorAll<HTMLElement>('[data-school-link]'), initSchoolLink);
  return () => {
    for (const stop of stops) stop();
  };
}
