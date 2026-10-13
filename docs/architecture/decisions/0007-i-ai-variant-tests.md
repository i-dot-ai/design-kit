# 7. i.AI variant tests

Date: 2026-09-18

## Status
Accepted

## Context

[decision 0006](/docs/architecture/decisions/0006-match-govuk-tests.md) holds the test coverage for the GOV.UK expected output but we have added our own variant classes on GOV.UK and brand new components.

We need an easy way to test for this as this is expected to be a common thing to be updated in the component library.

## Decision

We have an easy to configure `match i.ai variant classes` test which can be added for each component simply configuring the variant prop and the expected class:

```
export const iaiCheckboxesVariants: IaiVariant[] = [
    { name: "subtle", props: { subtle: true }, expectClass: "govuk-checkboxes--subtle" },
];
```

## Consequences
