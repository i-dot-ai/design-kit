---
name: iai-prototype
description: Instructions on how to get the latest guidance and the expected output when prototyping products in i.AI
---
 
 
# i.AI Prototype
 
Before you start any job be sure to fetch the latest guidance to ensure that you are working from the latest advice.
 
## Content
 
The content for the i.AI design kit lives in markdown and example code files in the following folder
 
`https://github.com/i-dot-ai/i-ai-design-system/tree/main/frontend/src/content`
 
Pull the content from here before any job.
 
`content/get-started` page describes how to use the design kit.
## Output
 
Output a single self-contained HTML file: inline the CSS and JS, don't link to them.
 
1. Read the versions of `govuk-frontend` and `@i-dot-ai-npm/component-library-frontend`
   from `frontend/package.json` in the i-ai-design-system repo you've just downloaded.
   Use the highest version that the version range in that file allows (check with `npm view`).
2. Download both packages with `npm pack <name>@<version>` and unpack them.
3. Inline, in this order:
   - govuk-frontend: `dist/govuk/govuk-frontend.min.css` and `.min.js`
   - i.AI: `dist/i-ai-design-system.min.css` and `.min.js`
   The i.AI styles must come after govuk-frontend.
4. Remove the `export { … }` statements from the JS and call `initAll()` and
   `initAllIAIDesignSystem()` directly.
5. For the branding follow the guidance in `/content/styles/branding`
6. Only if npm can't be reached, fall back to jsDelivr using the same versions:
   `https://cdn.jsdelivr.net/npm/<name>@<version>/…`