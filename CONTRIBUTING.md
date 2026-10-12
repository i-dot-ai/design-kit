# Contributing

This is a pnpm monorepo containing both the i.AI Design Kit site and the component library packages. Each module under `packages/` is published as an independent package on npmjs. This guide covers the day-to-day workflow, our conventions, and how to add a component.

## Table of contents

- [Repo structure and where to work](#repo-structure-and-where-to-work)
- [Adding to the Component Library](#adding-to-the-component-library)
  - [Things to consider before you build your component](#things-to-consider-before-you-build-your-component)
  - [tests](#tests)
  - [Techincal requirements](#technical-requirements)
- [Releases](#releases)

## Repo structure and where to work

This repo has been set up to have a central frontend package which holds all the CSS and JS needed for the components to work. Each framework then has it's own package which holds light wrappers to make authoring components in each framework as straight forward as possible.

The design kit site (`frontend/`) is both the documentation site and where you build and test components: you author example files per component, and per-framework test pages are generated from them at `/test/<component>/<variant>/<framework>`.

You should split your work across the following:

- [Design kit site](/frontend/) - Documentation and component examples. Draft your component's examples in `frontend/src/content/components/<component>/examples/` (one file per framework, e.g. `default.html`, `default.react.tsx`).
- [Frontend package](/packages/frontend/) - You should put your final central CSS and js files here
- Framework packages - where the final wrapper components should live.
  - [Svelte packages](/packages/svelte)
  - [React packages](/packages/react)
  - [Solid packages](/packages/solid)
  - [Astro packages](/packages/astro)

## Adding to the Component Library

This repo has been built so that your agent can help you add components to this library. In order to add to this library you should consider the following:

### Things to consider before you build your component

1. There should be a real need for the component:
  - Check that it is not already present in the i.AI component library
2. Check if another government department has already designed this component
  - If so, you can use this as a basis for your component

### Tests

Your component should be testing lead. Depending on your use case you will need to ensure that the following tests fully cover your component and all pass:

Unique to GOV.UK components:

- Match GOV.UK Fixtures tests

  These check to see if it matches the expected output given by GOV.UK Frontend. You will have to write a matching function which matches the variant prop to the expected class or attribute output.

  If it is a simple component where the only check is to match attributes, html structure and classes you can follow the example of the [details component tests](/tests-unit/src/component-tests/details/). 
  
  If you have a more complex fixture list where tests rely on children being rendered or more complex behaviour you can follow the example of the [Accordion component tests](/tests-unit/src/component-tests/accordion/).

If the component has variant classes:

- Matches i.AI variant classes

  This should only be for variants which do not exist in normal GOV.UK as GOV.UK variants such as `govuk-checkboxes--small` will have been covered in the above matching gov.uk fixture tests.
  
  For new components which are not in GOV.UK Frontend you will need to add all the variant classes for these tests.

  You can follow the example of the [Link component variant tests](/tests-unit/src/component-tests/link) to see how to format your tests. You will have to write a `iai-variants.ts` file which maps the props to the expected classes

New components which are not in GOV.UK

- Matches i.AI expected HTML

  These are to check that the html rendered in each framework match the expected html structure

  You will need to write an expected.html file and then assert that each component matches that output. You can see the example of the [Toggle test folder](/tests-unit/src/component-tests/toggle/) to see how to structure your tests

If the component is interactive (its behaviour is not covered by GOV.UK's own tested JS):

- Behavioural and accessibility tests

  Add your component's example files, which generate the per-framework test pages at `/test/<component>/<variant>/<framework>`. Write Playwright behaviour tests (and axe accessibility tests) that drive those pages across all frameworks and browsers. See the [modal tests](/tests-e2e/tests/modal/) for the pattern.

### Documentation

Write a documentation page for your component as an `index.mdx` in the [components content folder](/frontend/src/content/components/). It needs `name` and `status` frontmatter, and should cover the component text, when to use it, when not to use it, and any other guidance. Render each example with the `<Example />` component (available automatically, no import needed).

Coding examples go in the component's `examples/` folder, one file per framework.

The plain HTML and Astro test pages are generated from your examples automatically. For interactive components, the React, Svelte and Solid test pages are added manually under `frontend/src/pages/test/`.

Follow the [modal component](/frontend/src/content/components/modal/) as a complete worked example — its `index.mdx`, `examples/` and the test pages under `frontend/src/pages/test/modal/`.

### Technical requirements

- Progressive enhancements
  Your component should follow the progressive enhancement priniple of GOV.UK
- SCSS mixins - should use the govuk mixins where possible
- Variant classes should follow BEM structure e.g.`iai-card--secondary` or `govuk-button--tertiary` where extending a GOV.UK component
- Output - Components should all be broken down to behave in a way that children can be passed in a intuitive way. E.g. the table component should be consumed like the following:

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
              <TableRow>
                  <TableCell>February</TableCell>
                  <TableCell numeric>£75</TableCell>
                  <TableCell numeric>£55</TableCell>
              </TableRow>
              <TableRow>
                  <TableCell>March</TableCell>
                  <TableCell numeric>£165</TableCell>
                  <TableCell numeric>£125</TableCell>
              </TableRow>
          </TableBody>
      </Table>
  ```

## Releases

If you up the version number in the package.json of any package it will be released on a merge to main