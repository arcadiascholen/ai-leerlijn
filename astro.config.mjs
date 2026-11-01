// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import rehypeExternalLinks from 'rehype-external-links';
import { externalLinks } from './src/lib/external-links.ts';

export default defineConfig({
  site: 'https://arcadiascholen.github.io',
  base: '/ai-leerlijn',
  // Links to another site open in a new tab. On the MDX integration, not on
  // `markdown.rehypePlugins` (deprecated): all content is MDX.
  integrations: [mdx({ rehypePlugins: [[rehypeExternalLinks, externalLinks]] }), react()],
});
