# 3. Light framework packages

Date: 2026-09-18

## Status
Accepted

## Context

Products in i.AI are written in React and Svelte. Solid and Svelte has been proposed as languages to be encouraged to be used in i.AI.

Projects in i.AI should be built in Astro. Many are built in Next.

We want any component library to be maintainable. It was felt that if we are too perscriptive (e.g. building only a svelte library). then the component library might not be used.

## Decision

We will build lightweight framework wrappers for the following languages to begin with:

- React
- Solid
- Svelte
- Web components
- Astro

## Consequences

Any components will have to built in all languages. We will have to work out a maintainable way of dealing with this.