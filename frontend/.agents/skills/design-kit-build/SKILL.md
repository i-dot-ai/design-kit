---
name: design-kit-build
description: Instructions on how to get the latest guidance and the expected output when building products in i.AI
---
 
 
# Design Kit Build
 
Before you start any job be sure to fetch the latest guidance to ensure that you are working from the latest advice.
 
## Content
 
The content for the i.AI design kit lives in markdown and example code files in the following folder
 
`https://github.com/i-dot-ai/i-ai-design-system/tree/main/frontend/src/content`
 
Pull the content from here before any job.
 
`content/get-started` page describes how to use the different pages of the kit, this includes project set up, styles components and patterns.

Read all the content first to see what examples exist there and where they would apply to what you will build.

`content/get-started/update-a-product-interface` describes how to add the idotai design kit to this project if it is not already added.

### Component library packages

The component library is made up of different packages:

- `@i-dot-ai-npm/component-library-frontend` - central js and css styles

The rest are language specific wrapper components
- `@i-dot-ai-npm/component-library-astro`
- `@i-dot-ai-npm/component-library-react`
- `@i-dot-ai-npm/component-library-svelte`
- `@i-dot-ai-npm/component-library-solid`

Pick the relevant component package to use. We recommend astro but if the project has not been set up with astro or the dev prefers a particular framework use that instead