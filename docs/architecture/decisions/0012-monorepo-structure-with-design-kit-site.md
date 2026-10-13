# 12. Monorepo structure with design kit site

Date: 2026-10-12

## Status
Accepted

## Context

[Decision 0004](/docs/architecture/decisions/0004-gallery-for-working-in-and-tests.md) was leading to duplicated content of needing testing content and documented content in the design system.

There was also the risk of having divergence between documentation and how components were tested.

Also believed that engineers working on adding a component might miss updating the content.

## Decision

We will move the component packages and design kit site content into one mono-repo. Test pages will be built from the example content written in the content guides.

## Consequences

Needed separate implemntation for react, solid and svelte test pages compared to html and astro.