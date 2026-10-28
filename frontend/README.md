# Design Kit documentation site

This is the [Astro](https://astro.build) application that powers the i.AI Design
Kit documentation site at [design-kit.ai.gov.uk](https://design-kit.ai.gov.uk).

It renders the component docs, guidance, patterns and principles, and generates
the component test pages used by the end-to-end tests. Content lives in
`src/content/`; the component examples under
`src/content/components/<component>/examples/` act as the shared spec for both
the docs and the generated test pages.

## Running locally

From the repository root:

```bash
make install
make run_frontend
```

Or from this directory with pnpm:

```bash
pnpm dev       # start the local dev server
pnpm build     # build the static site to ./dist/
pnpm preview   # preview the built site
pnpm lint      # run ESLint
```

## Structure

- `src/content/` — docs content (components, styles, patterns, principles, get-started, in-practice).
- `src/pages/` — routes, including `test/` which hosts the generated component test pages.
- `src/layouts/` — page layouts for each section of the site.
- `src/components/docs/` — components used to render the documentation.
- `src/components/in-practice/` — the timeline, before and after, and live prototype components used in In practice stories.
- `scripts/` — build tooling (component page and example generation, skill packaging).
- `.agents/skills/` — AI-agent skills published with the site.

See the repository [README](../README.md) and [CONTRIBUTING](../CONTRIBUTING.md)
for the wider project and the component authoring workflow.
