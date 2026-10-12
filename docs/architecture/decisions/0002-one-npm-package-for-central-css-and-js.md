# 2. One npm package for central CSS and JS

Date: 2026-09-18

## Status
Accepted

## Context

GOV.UK works as a npm package which holds it's js and CSS. We want to follow in GOV.UK approach.

Adhering as much as possible to have components that work with JS and a CSS allows our design systems to work in any handovers to departments which might not allow frameworks.

## Decision

We will hold all CSS and js needed for components to work in a single package. This will only hold our extensions to govuk-frontend.

SCSS files will be made for each component that will then get packaged to be consumed as a minified CSS file.

## Consequences

Any subsequent framework packages will have a dependency on govuk-frontend and component-library-frontend