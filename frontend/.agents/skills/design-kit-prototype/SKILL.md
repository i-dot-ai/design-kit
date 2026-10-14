---
name: design-kit-prototype
description: Instructions on how to get the latest guidance and the expected output when prototyping products in i.AI
---
 
 
# Design Kit Prototype
 
Before you start any job be sure to fetch the latest guidance to ensure that you are working from the latest advice.
 
## Content
 
The content for the i.AI design kit lives in markdown and example code files in the following folder
 
`https://github.com/i-dot-ai/design-kit/tree/main/frontend/src/content`
 
Pull the content from here before any job.
 
`content/get-started` page describes how to use the design kit.

## Output
 
Output a single self-contained HTML file: inline the CSS and JS, don't link to them.
 
1. Read the dependency versions from frontend/package.json in the design-kit repo
   you downloaded. For each design-kit package, use the highest version its range
   allows (check with `npm view`).
2. Download each package with `npm pack <name>@<version>` and unpack it.
3. Inline each package's prebuilt CSS and JS (see dist/ in the unpacked package).
   Inline the base framework (govuk-frontend) first, then each layer that builds
   on top of it, in dependency order.
4. The JS is published as ES modules. Strip the `export { … }` statements and call
   each package's init function directly (see each package's entry/README for the
   name).
5. Apply the brand chosen in /content/styles/branding. That guidance is written
   for a Sass build; for an inlined prototype, translate it instead:
     - Read the brand's values from its example files under
       /content/styles/branding/examples.
     - Set each functional-colour as a CSS custom property in a :root block
       inlined after the stylesheets, and apply the brand font.
     - Add any body/theme class the guidance specifies.
   Let the packages style components (header, footer, etc.) from those variables;
   don't hardcode component colours.
6. If npm can't be reached, fall back to jsDelivr using the same versions.