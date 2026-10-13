# 4. Gallery folder for working in and testing components

Date: 2026-09-18

## Status
Superseded

## Context

Given that the final output of each component will be across 6 packages (the 5 frameworks and a central frontend package) we need a central place where someone can build a component.

We need somewhere we can build and immediately see the changes.

## Decision

The gallery folder is an astro project built using the cookie cutter and set up with the i.AI Design Kit to mirror how the component library will be used by i.AI.

## Consequences

We need a good method for how to translate what is built in the gallery to the various package folders.

We ideally would want this gallery to have more accessible component builder functionality in the future so that more people can help build components.
