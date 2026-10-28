# Contributing to the Component Library

This is a pnpm monorepo. It holds the i.AI Design Kit site (`frontend/`) and the component library packages (`packages/`). Each package under `packages/` is published independently on npm.

## Table of contents

- [How we work: spec-led](#how-we-work-spec-led)
- [Setup](#setup)
- [Repo map](#repo-map)
- [Adding a component](#adding-a-component)
- [Modifying a component](#modifying-a-component)
- [Adding an In practice story](#adding-an-in-practice-story)
- [Tests reference](#tests-reference)
  - [Unit tests](#unit-tests)
    - [i.AI variant](#iai-variant)
    - [i.AI expected HTML](#iai-expected-html)
    - [match-govuk](#match-govuk)
  - [E2E tests](#e2e-tests)
    - [Test pages](#test-pages)
    - [accessibility](#accessibility)
    - [behaviour](#behaviour)
- [Conventions](#conventions)
- [Releases](#releases)
- [Before you open a PR](#before-you-open-a-pr)

## How we work: spec-led

Write the spec first, then build the component until it passes. The spec is the tests, together with the files they assert against. For a new component the spec is your `default.html` example in the design kit; for variants it is your `iai-variants.ts` map. So writing the example and writing the test is one step, done before you build the component.

This matters most when an AI agent does the work: the tests define "done", not the agent's judgement.

A component is done when `make run_all_tests` passes across all frameworks and browsers.

### Guidelines

- Any enhancement to a GOV.UK component is expected to be confined to adding variant classes. The GOV.UK expected output is loaded live from the `govuk-frontend` package, so there is nothing in this repo to edit anyway.
- Do not weaken a test to make it pass. If a conformance test fails, fix the component.

## Setup

```
make install          # install dependencies
make run_frontend     # run the design kit site
make run_unit_tests   # conformance, variant and expected-HTML tests
make run_e2e_tests    # behaviour and accessibility tests
make run_all_tests    # everything
```

## Repo map

A component is spread across these places:

- `frontend/src/content/components/<component>/` — docs (`index.mdx`) and `examples/`
- `packages/frontend` — the component's final CSS and JS
- `packages/{astro,react,svelte,solid}` — the framework wrappers
- `tests-unit/src/component-tests/<component>/` — conformance, variant and HTML tests
- `tests-e2e/tests/<component>/` — behaviour and accessibility specs

## Adding a component

1. Check it's needed. Make sure it isn't already in the library. If another government department has designed it, use that as a basis.
2. Write the spec first. Author the example files in `frontend/src/content/components/<component>/examples/`, one per framework: `default.html`, `default.astro`, `default.react.tsx`, `default.svelte`, `default.solid.tsx`. Then write the tests that apply (see [Tests reference](#tests-reference)), pointing them at these examples. Run them and confirm they fail.
3. Build the central CSS and JS in `packages/frontend`.
4. Build the wrappers in `packages/{astro,react,svelte,solid}`.
5. Write the docs page as `index.mdx` with `name` and `status` frontmatter. Cover what the component is, when to use it and when not to. Render each example with `<Example />` (no import needed).
6. Run `make run_all_tests` and confirm it passes across all frameworks and browsers.

The plain HTML and Astro test pages are generated from your examples. For interactive components, add the React, Solid and Svelte test pages by hand under `frontend/src/pages/test/`. The [modal component](/frontend/src/content/components/modal/) is a full worked example.

## Modifying a component

### Adding a variant class

If you are modifying a GOV.UK component, you should restrict your modification to just adding a variant class and the i.AI variant tests below.

Similarly, if you are only adding a variant to an i.AI component you will need the relevant i.AI variant test to be added first.

### Changing behaviour

If you are changing the behaviour of any component you should write the relevant behaviour playwright test first.

## Adding an In practice story

In practice tells the story of how a product team used the kit. Each story is short and visual, and links to the team's own design history for the detail. Use `frontend/src/content/in-practice/parlex/index.mdx` as the template.

1. Add a folder to `frontend/src/content/in-practice/` with an `index.mdx`.
2. Fill in the frontmatter: `title`, `description`, `product`, `kitUsed` and `fullStory`. The page adds the "Kit used" list and the "Read the full story" panel at the end from it.
3. Write the body under these headings, leaving out any that don't apply: The problem, Before and after, What we did, Try it yourself, The kit in practice, What we learned, What's next.
4. Put screenshots in `frontend/public/images/in-practice/<product>/` as `.webp`. If you embed a working prototype, save it as one HTML file in `frontend/public/prototypes/`.

Three components bring a story to life. They're for this section only, not part of the component library:

| Component | Use it for |
|---|---|
| `<BeforeAfter>` | Before and after. A slider over two screenshots of the same screen. Start from the product as it was before the kit |
| `<StoryTimeline>` with a `<StoryStep>` for each stage | What we did. A sticky screenshot follows the step being read, with links to jump to any step or skip to the end |
| `<LivePrototype>` | Try it yourself. A working prototype, with computer and phone sizes |

Each one works without JavaScript and on small screens, where screenshots show inline.

## Tests reference

Pick the tests that apply to your component. Each one points at a template to copy.

### Unit tests

Live in `tests-unit/src/component-tests/<component>/`.

#### i.AI variant

This tests that each variant prop renders the expected variant class, in every framework.

- For: a component with variant classes that GOV.UK does not have.
- Checks the rendered output includes the expected class for each variant prop.
- Steps:
    - write an `iai-variants.ts` file that maps each variant to its props and expected class (for example `{ name: "warning", props: { variant: "warning" }, expectClass: "govuk-link--warning" }`).
    - write the `iai-variants` test for each framework.
- Example: `tests-unit/src/component-tests/link/`.

#### i.AI expected HTML

This tests that all frameworks produce the same expected HTML.

- For: a new component that is not in GOV.UK.
- Checks the rendered HTML against your `default.html` example (see [Adding a component](#adding-a-component)).
- Steps: 
    - write the example HTML in the design kit under `frontend/src/content/components/<component>/examples/default.html`.
    - write the `match-iai-expected-html` test for each framework
- Example: `tests-unit/src/component-tests/toggle/`.

#### match-govuk

**It is not expected that these will need to be written or updated**

These tests were written once to ensure that the base GOV.UK components matched the expected output from govuk-frontend package itself.

- For: any component that wraps a GOV.UK component.
- Checks your wrapper against GOV.UK's own fixtures. The expected output comes from the `govuk-frontend` package. It is already there and you do not write or update it. If this test fails, fix the component.
- Example: `tests-unit/src/component-tests/details/`.

### E2E tests

Live in `tests-e2e/tests/<component>/` and drive the component's test pages. Both the accessibility and behaviour tests share the same test pages and `*-pages.ts` helper, so set those up first.

#### Test pages

Each test runs against one page per framework: plain HTML, Astro, React, Solid and Svelte. They live at `/test/<component>/<variant>/<framework>`.

- The HTML and Astro pages are generated from your examples (see [Adding a component](#adding-a-component)).
- The React, Solid and Svelte pages are written by hand as `.astro` files under `frontend/src/pages/test/<component>/[variant]/`.

Then write a `*-pages.ts` helper in `tests-e2e/tests/<component>/`. It lists the pages to test and holds any shared actions the specs reuse:

- `<COMPONENT>_PAGES`: an array of `{ name, path }` for each framework, for example `{ name: "react", path: "/test/modal/default/react" }`.
- shared actions, for example an `openModal(page)` that both specs call. Framework islands hydrate after the page renders, so retry the action until it takes effect (see `openModal` in `tests-e2e/tests/modal/modal-pages.ts`).

#### accessibility

This runs axe against the component on each framework's test page and checks for no violations.

- For: any interactive component.
- Checks the rendered page has no accessibility violations, driving it into the state that needs testing first (for example, opening a modal).
- Steps:
    - set up the test pages and `*-pages.ts` helper (see [Test pages](#test-pages)).
    - write the `*.a11y.spec.ts` test: for each page, go to it, drive it into the state, run `AxeBuilder`, and assert `results.violations` is empty.
- Example: `tests-e2e/tests/modal/`.

#### behaviour

This drives the component on each framework's test page and checks it behaves the same everywhere.

- For: any component whose behaviour is not covered by GOV.UK's own tested JS.
- Checks the component responds correctly to user actions, across every framework (for example: opens from the trigger, closes on Escape, backdrop click and close button, traps and restores focus, locks background scroll).
- Steps:
    - set up the test pages and `*-pages.ts` helper (see [Test pages](#test-pages)).
    - write the `*.behaviour.spec.ts` test: loop the pages, go to each, perform the action and assert the result. Use `getByTestId` to target elements, and `expect.poll` for state that settles after an event.
- Example: `tests-e2e/tests/modal/`.

#### visual regression

- For: any new component (assumed that GOV.UK components are fine)
- Checks for any visual regression from previous snapshots and between frameworks on each browser
- Steps:
    - set up the test pages and `*-pages.ts` helper (see [Test pages](#test-pages)).
    - write the `*.snapshot.spec.ts` test: loop the pages, go to each component and assert it matches the previous snapshots for that browser
- Example: `tests-e2e/tests/modal/`.

## Conventions

- Follow the GOV.UK progressive enhancement principle.
- Use the GOV.UK SCSS mixins where possible.
- Name variant classes with BEM, for example `iai-card--secondary` or `govuk-button--tertiary`.
- Break components down so children can be passed in an intuitive way. For example:

  ```
  <Table>
      <TableCaption size="medium">Monthly energy costs</TableCaption>
      <TableHead>
          <TableRow>
              <TableHeader>Month</TableHeader>
              <TableHeader numeric>Gas</TableHeader>
              <TableHeader numeric>Electricity</TableHeader>
          </TableRow>
      </TableHead>
      <TableBody>
          <TableRow>
              <TableCell>January</TableCell>
              <TableCell numeric>£85</TableCell>
              <TableCell numeric>£95</TableCell>
          </TableRow>
      </TableBody>
  </Table>
  ```

## Releases

Bump the version in a package's `package.json` and it is released on merge to `main`. Each package is versioned independently.

## Before you open a PR

- [ ] You wrote the applicable tests first and they now pass
- [ ] `make run_all_tests` passes across all frameworks and browsers
- [ ] Examples exist for every framework
- [ ] The docs `index.mdx` has `name` and `status` frontmatter
- [ ] Variant classes use BEM and the component works without JavaScript
- [ ] You fixed any conformance failure in the component, not the test
- [ ] You bumped the version if you want a release
