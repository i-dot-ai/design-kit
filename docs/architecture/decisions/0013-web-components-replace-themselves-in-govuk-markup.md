# 13. Web components replace themselves with GOV.UK markup

Date: 2026-10-28

## Status
Accepted

## Context

We need web component versions of our components ([decision 0003](/docs/architecture/decisions/0003-light-framework-packages.md)). They're useful if working with other government departments which do not allow frameworks such as MHCLG.

There are two challenges.

1. **Fitting with the central package.** Our styling and behaviour come from one central CSS and JavaScript package based on GOV.UK ([decision 0002](/docs/architecture/decisions/0002-one-npm-package-for-central-css-and-js.md)). This expects elements to sit in an exact order. For example, a checkbox label must come directly after its input. A web component normally stays in the page as its own tag, such as `<iai-checkbox-label>`. That extra tag breaks the order, so styles and behaviour stop working. Shadow DOM isn't an option either, because the central CSS can't reach inside it.

2. **Safari.** One workaround is to extend a built-in element, such as `<tr is="iai-table-row">`, so that structures like tables stay valid. Safari doesn't support this.

## Decision

Each web component replaces itself with plain GOV.UK HTML when it loads. For example, `<iai-button>` becomes `<button class="govuk-button">`. No `iai-*` tags are left in the page.

## Consequences

- The components won't work inside React or other frameworks, because those frameworks expect the elements they create to stay in the page. Projects using a framework should use its component package instead.
- After a component loads, its `iai-*` tag is gone. Changing its attributes does nothing, and scripts can't keep a reference to it. Changes must be made on the GOV.UK element itself.
- The web components script must run before GOV.UK's `initAll()`, or the JavaScript won't find the components. Content added to the page later needs `initAll()` run on it again.
- The script must be loaded as a module or at the end of the page, so that each component's content exists before it replaces itself.
- Our unit tests can't catch loading-order problems, so they need checking with browser tests.
