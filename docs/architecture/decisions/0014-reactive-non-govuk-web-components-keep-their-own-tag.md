# 14. Reactive non-GOV.UK web components keep their own tag

Date: 2026-11-03

## Status
Superseded

## Context

[Decision 0013](/docs/architecture/decisions/0013-web-components-replace-themselves-in-govuk-markup.md) has web components replace themselves with GOV.UK markup. Once replaced, they can't react to changes in their data or attributes.

## Decision

Reactive components that are not GOV.UK components, such as the chart, do not replace themselves with GOV.UK markup. They stay on the page as their `iai-*` tag so they can update.

## Consequences

- They can be updated from plain JavaScript, for example `chart.data = newData`.
- They need a `display` rule in their SCSS, because custom elements are inline by default.
- They're listed in `KEEPS_HOST` in `tests-unit/src/match-iai-expected-html-helpers/expected.ts`, so their tests ignore the outer tag.
