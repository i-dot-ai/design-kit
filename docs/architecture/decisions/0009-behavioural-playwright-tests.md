# 9. Behavioural playwright tests for new components

Date: 2026-09-18

## Status
Accepted

## Context

[Decision 0008](/docs/architecture/decisions/0008-match-expected-html-tests.md) covers the expected output tests of our new components, however we still need tests to assert the expected behaviour of these components.

It is assumed that GOV.UK components have been properly tested so matching out alone should be enough, we do not need to test those components twice.

## Decision

We will write playwright tests asserting the expected behaviour of the components.

Each component will have a page per framework which renders the component in the design kit site under `/test/<component>/<variant>/<framework>`. Playwright can run the web server for the site and test there.

## Consequences
