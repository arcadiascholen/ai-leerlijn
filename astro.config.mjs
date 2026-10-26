// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://arcadiascholen.github.io',
  base: '/ai-leerlijn',
  integrations: [mdx(), react()],
});
