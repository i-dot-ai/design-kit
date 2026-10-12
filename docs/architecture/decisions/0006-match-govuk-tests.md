# 6. Match govuk tests

Date: 2026-09-18

## Status
Accepted

## Context

[decision 0005](/docs/architecture/decisions/0005-test-driven-agent-assisted-authoring.md) states that we need to build a thorough test suite to ensure that AI made components are fit for purpose.

GOV.UK components come with a fixtures.json file which shows expected output according to which classes are on the components.

As we are building on top of GOV.UK we also need to check against updates to the components that come from GOV.UK.

## Decision

We have built a set of tests which take the html and expected output for each GOV.UK component and maps the props that our components expect to achieve that output.

We have helper functions to normalise and use the data held in the [match-govuk-helpers folder](/tests/src/matches-govuk-helpers/).

Individual components can render examples in each framework and test that the output matches what is expected from the fixtures.json

## Consequences

This is fairly complex functionality to calculate expected outcome etc. However, it was thought that most new contributions to the component library will not be existing GOV.UK components as we have mapped all of them. Therefore it was ok to do as a one off effort in order to have the initial coverage.

This also serves as a direct check for when versions are bumped in GOV.UK