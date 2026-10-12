# 10. Visual regression tests

Date: 2026-09-18

## Status
Accepted

## Context

We have covered behaviour, html output tests but there's still a chance that CSS won't match or we get visual regressions in our components.

## Decision

We will use the same test pages made for [decsion 0009](/docs/architecture/decisions/0009-behavioural-playwright-tests.md) in the design kit site (`/test/` routes) and run playwright visual regression tests on all components in all frameworks.

## Consequences
