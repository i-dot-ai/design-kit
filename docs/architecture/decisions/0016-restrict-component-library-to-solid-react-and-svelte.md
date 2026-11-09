# 16. Restrict component library to only the svelte, solid and react versions

Date: 2026-11-09

## Status
Accepted

## Context

The Astro components were thin wrappers that rendered the same GOV.UK markup as the HTML versions and relied on the central package for behaviour ([decision 0002](/docs/architecture/decisions/0002-one-npm-package-for-central-css-and-js.md)). This works for simple components but becomes tricky as complexity gets higher and stateful components are needed. Plain HTML users are unaffected: the central package makes it possible to use the components without a framework.

We want using and contributing the kit to be as easy as possible. The use case of starting with "astro"/html versions and only moving to solid or react when needed later is an unnecessary barrier.

Similarly, translating the chart components over to web components was not as straightforward as between react, solid and svelte. It was felt that non frontend specialists might be put off from questions about the differences.

Web components also need JavaScript before anything renders, so they cannot be progressively enhanced.

## Decision

The frameworks supported by the design kit will be limited to:

- Solid.js
- React
- Svelte

These are currently the ones used or recommended in i.AI.

The Astro wrapper package (`@i-dot-ai-npm/component-library-astro`) and the web components package (`@i-dot-ai-npm/component-library-web-components`) will be removed.

## Consequences

- Projects that have started with the Astro components will need to migrate.
- Both packages are already published on npm, so they will be deprecated there.
