# 8. Match expected html tests for new components

Date: 2026-09-18

## Status
Accepted

## Context

[decision 0006](/docs/architecture/decisions/0006-match-govuk-tests.md) holds the test coverage for the GOV.UK expected output but we have and expect more new components to be added which are not in GOV.UK.

We need these tests to be easy and intuitive to author as we want a wide range of contributers to the components library and we expect new components to be the majority of the necessary additions.

## Decision

We have made a `Matches i.AI expected HTML` model with helpers so that authors can write a single expected.html file like the following:

```
<div class="iai-toggle__item">
    <input class="iai-toggle__input" type="checkbox" role="switch" id="t" />
    <label class="govuk-label iai-toggle__label" for="t">Enable</label>
</div>
```

And assert that the frameworks all match this output. Alongside the variant tests in [decision 0007](/docs/architecture/decisions/0007-i-ai-variant-tests.md) this should cover basic behaviour.

## Consequences