import type { Element, ElementContent } from 'hast';
import type { Options } from 'rehype-external-links';

// Options for rehype-external-links (astro.config.mjs; @astrojs/mdx inherits
// them): a link to another site in Markdown opens in a new tab, so the module
// stays open (docs/BRIEFING.md § 12). External means an absolute http(s)
// address; links within the site and to `#stap-n` stay in the same tab.
//
// After the link text comes the arrow-out-of-a-box icon of ExternalIcon in
// Samenvatting.tsx, and a hidden text for screen readers. The plugin generates
// the markup, so its styles are in src/styles/global.css (`.new-tab`).

const icon: Element = {
  type: 'element',
  tagName: 'svg',
  properties: { className: ['new-tab-icon'], viewBox: '0 0 24 24', ariaHidden: 'true' },
  children: [
    {
      type: 'element',
      tagName: 'path',
      properties: { d: 'M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5' },
      children: [],
    },
  ],
};

const hiddenText: Element = {
  type: 'element',
  tagName: 'span',
  properties: { className: ['sr-only'] },
  children: [{ type: 'text', value: ' (opent in een nieuw tabblad)' }],
};

// Takes the last word of the link text out of the link. The plugin puts the
// content in a span of its own after the link text; with the last word in
// that span too, and the span not wrapping, the icon never ends up alone on
// the next line. A last child that is not text (`**bold**`, `code`) moves
// as a whole.
function takeLastWord(link: Element): ElementContent[] {
  const last = link.children.at(-1);
  if (last === undefined) return [];
  const start = last.type === 'text' ? last.value.search(/\S+\s*$/) : -1;
  if (last.type !== 'text' || start <= 0) {
    link.children.pop();
    return [last];
  }
  const word = last.value.slice(start);
  last.value = last.value.slice(0, start);
  return [{ type: 'text', value: word }];
}

export const externalLinks: Options = {
  target: '_blank',
  rel: ['noopener', 'noreferrer'],
  contentProperties: { className: ['new-tab'] },
  content: (link) => [...takeLastWord(link), icon, hiddenText],
};
