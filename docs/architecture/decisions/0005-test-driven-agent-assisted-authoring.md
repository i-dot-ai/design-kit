# 5. Test driven, agent assisted authoring

Date: 2026-09-18

## Status
Accepted

## Context

Initial approaches to the component library were based on the idea of having generator scripts where authors could write html like components and the 4 framework versions of those components could be deterministically generated from there. However, this quite quickly resulted in a complex syntax being developed to handle complex or even simple behavioural cases. Given that the complexity of the new components to be added is likely to grow this was considered unsustatinable and a likely blocker to people adding to the library.

Quick testing showed that LLMs and agents were good at converting components across different frameworks.

## Decision

It is understood that contributers will use AI to assist them in building and extending components. We will develop a robust testing framework to provide deterministic reliability that the components are delivering what we want.

## Consequences

We need to develop thorough test suite, testing principles and clear contribution guidelines to ensure that components added are good quality and fit for purpose.