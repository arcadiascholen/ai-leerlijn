// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import rehypeExternalLinks from 'rehype-external-links';
import { externalLinks } from './src/lib/external-links.ts';

export default defineConfig({
  site: 'https://arcadiascholen.github.io',
  base: '/ai-leerlijn',
  integrations: [mdx(), react()],
  // @astrojs/mdx inherits this: links to another site open in a new tab.
  markdown: {
    rehypePlugins: [[rehypeExternalLinks, externalLinks]],
  },
});
