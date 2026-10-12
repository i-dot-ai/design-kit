// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sentry from '@sentry/astro';
import mdx from '@astrojs/mdx';
import rehypeAddClasses from 'rehype-add-classes';
import tailwindcss from '@tailwindcss/vite';
import { NodePackageImporter } from 'sass';
import { fileURLToPath } from 'node:url';
import react from '@astrojs/react';
import solid from '@astrojs/solid-js';
import svelte from '@astrojs/svelte';


const port = 4321;

/*
 * Inject GOV.UK / i.AI classes into HTML rendered from Markdown/MDX content
 * (src/content). Authors write plain Markdown; these classes make the output
 * match the hand-written govuk pages. Applies to both .md and .mdx.
 */
const govukClasses = {
  p: 'govuk-body',
  h2: 'govuk-heading-l',
  h3: 'govuk-heading-m',
  h4: 'govuk-heading-s',
  a: 'govuk-link',
  blockquote: 'govuk-inset-text',
  ul: 'govuk-list govuk-list--bullet',
  ol: 'govuk-list govuk-list--number',
  table: 'govuk-table',
  thead: 'govuk-table__head',
  tbody: 'govuk-table__body',
  tr: 'govuk-table__row',
  th: 'govuk-table__header',
  td: 'govuk-table__cell',
};

// https://astro.build/config
export default defineConfig({
  server: { port: port, host: true },
  adapter: node({
    mode: 'standalone',
  }),
  output: 'static',
  markdown: {
    smartypants: false,
    shikiConfig: { theme: 'github-light' },
    rehypePlugins: [[rehypeAddClasses, govukClasses]],
  },
  integrations: [
    mdx(),
    react({
      include: ['**/*.react.tsx', '**/packages/react/**/*.tsx'],
    }),
    solid({
      include: ['**/*.solid.tsx', '**/packages/solid/**/*.tsx'],
    }),
    svelte(),
    // Uncomment if using Sentry
    /*
    sentry({
      environment: process.env.ENVIRONMENT,
      dsn: process.env.SENTRY_DSN?.replaceAll('"', ''),
      tracesSampleRate: 0,
      replaysSessionSampleRate: 0,
      replaysOnErrorSampleRate: 0,
      sourceMapsUploadOptions: {
        project: process.env.REPO',
        authToken: process.env.SENTRY_AUTH_TOKEN?.replaceAll('"', ''),
      },
    }),
    */
  ],
  vite: {
    plugins: [tailwindcss()],
    css: {
      lightningcss: {
        errorRecovery: true,
      },
      preprocessorOptions: {
        scss: {
          // @ts-expect-error valid Vite/Sass option, missing from Astro's types
          api: 'modern-compiler',
          loadPaths: [fileURLToPath(new URL('./node_modules', import.meta.url))],
          importers: [new NodePackageImporter()],
        },
      },
    },
  }
});
