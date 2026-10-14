[![build](https://github.com/i-dot-ai/design-kit/actions/workflows/release-public-site.yml/badge.svg?branch=main)](https://github.com/i-dot-ai/design-kit/actions/workflows/release-public-site.yml?query=branch%3Amain)

# i.AI Design Kit

The i.AI Design Kit is a component library built on top of [GOV.UK Frontend](https://frontend.design-system.service.gov.uk/). It provides i.AI's styling and variants as a shared CSS/JS layer plus thin framework wrappers, so teams get consistent, accessible components in whichever framework they use.

The documentation site is live at **[design-kit.ai.gov.uk](https://design-kit.ai.gov.uk)**.

## Packages

Each package is published independently to npm under the `@i-dot-ai-npm` scope.

| Package | What it is |
| --- | --- |
| `@i-dot-ai-npm/component-library-frontend` | The core CSS and JS layer over GOV.UK Frontend. Framework-agnostic. |
| `@i-dot-ai-npm/component-library-react` | React component wrappers. |
| `@i-dot-ai-npm/component-library-solid` | Solid component wrappers. |
| `@i-dot-ai-npm/component-library-svelte` | Svelte component wrappers. |
| `@i-dot-ai-npm/component-library-astro` | Astro component wrappers. |

## Using the kit in your app

Install the core layer alongside the wrapper for your framework (React shown here):

```bash
npm install @i-dot-ai-npm/component-library-frontend @i-dot-ai-npm/component-library-react govuk-frontend
```

`govuk-frontend` is a peer dependency. The framework wrappers depend on the core
`component-library-frontend` layer for styles and behaviour, so install both.

Import the styles once (the core package exposes `./scss`, `./css` and `./min.js`
entry points), then use components from your framework package. See the
[Get started](https://design-kit.ai.gov.uk/get-started) guide on the site for
framework-specific setup and examples.

## Repository layout

This is a pnpm monorepo.

- `packages/` — the published packages (core layer + framework wrappers).
- `frontend/` — the Astro documentation site (`design-kit.ai.gov.uk`).
- `tests-unit/` — Vitest conformance, variant and HTML-equivalence tests.
- `tests-e2e/` — Playwright behaviour and accessibility tests.
- `docs/architecture/decisions/` — architecture decision records.
- `terraform/` — infrastructure for deploying the documentation site.

## Local development

```bash
make install
make run_frontend
```

`make run_frontend` runs the documentation site locally. See
[CONTRIBUTING.md](CONTRIBUTING.md) for how to add or modify components, and the
test workflow.

### Tests

```bash
make run_unit_tests      # Vitest
make install_e2e_browsers
make run_e2e_tests       # Playwright
make run_all_tests       # both
```

## Deployment

The documentation site is built as a static site and deployed by the GitHub
Actions workflow in `.github/workflows/release-public-site.yml`:

- Push to `main` deploys to **prod** (`https://design-kit.ai.gov.uk`).
- `make release env=dev` / `env=preprod` deploys to those environments.

Package releases are independent: bump a package's version in its `package.json`
and merge to `main`, and `.github/workflows/release-packages.yml` publishes any
version not already on npm (via npm trusted publishing / OIDC).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).
