# 11. Accessibility tests

Date: 2026-09-18

## Status
Accepted

## Context

We have a legal requirement for our products to be WCAG 2.0 compliant.

Raising accessibility standards across our products in i.AI is a major reason for the component library in the first place

## Decision

We will use the same test pages made for [decsion 0009](/docs/architecture/decisions/0009-behavioural-playwright-tests.md) in the design kit site (`/test/` routes) and run playwright axe accesibility tests on all frameowrks and in all 4 main browsers.

## Consequences
