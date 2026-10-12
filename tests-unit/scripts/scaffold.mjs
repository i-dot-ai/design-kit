#!/usr/bin/env node
// Scaffold the boilerplate for a component's govuk-match tests.
//
// Generates, under tests/src/component-tests/<component>/:
//   match-govuk-mappings.ts        (a starter ComponentMapping to fill in)
//   tests/govuk-match.react.test.tsx
//   tests/govuk-match.solid.test.tsx
//   tests/govuk-match.svelte.test.ts
//   tests/govuk-match.astro.test.ts
//
// The four test files are near-identical Tier-1 skeletons that differ only by
// framework (package import, render helper, describe label, async for astro).
// You then fill in match-govuk-mappings.ts with the component's real prop
// divergence. Composite (Tier-2) components need extra examples/content files
// authored by hand — see CONTRIBUTING.md.
//
// Usage:
//   node scripts/scaffold.mjs <component> [--export=Name] [--force] [--dry-run]
//   pnpm scaffold <component>
//
// <component> is the kebab-case folder name (matches packages/*/src/<component>
// and the govuk fixtures.json component name), e.g. "phase-banner".

import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const TESTS_ROOT = resolve(__dirname, "..");
const COMPONENT_TESTS_DIR = join(TESTS_ROOT, "src", "component-tests");

// Resolve govuk fixtures the same way oracle.ts does — through the package
// resolver, so pnpm's nested store is handled correctly.
const require = createRequire(import.meta.url);
function hasGovukFixture(component) {
    try {
        require.resolve(`govuk-frontend/dist/govuk/components/${component}/fixtures.json`);
        return true;
    } catch {
        return false;
    }
}

const FRAMEWORKS = [
    { key: "react", label: "React", pkg: "react", render: "renderReact", ext: "tsx", async: false },
    { key: "solid", label: "Solid", pkg: "solid", render: "renderSolid", ext: "tsx", async: false },
    { key: "svelte", label: "Svelte", pkg: "svelte", render: "renderSvelte", ext: "ts", async: false },
    { key: "astro", label: "Astro", pkg: "astro", render: "renderAstro", ext: "ts", async: true },
];

function parseArgs(argv) {
    const args = { component: undefined, exportName: undefined, force: false, dryRun: false };
    for (const arg of argv) {
        if (arg === "--force") args.force = true;
        else if (arg === "--dry-run" || arg === "-n") args.dryRun = true;
        else if (arg.startsWith("--export=")) args.exportName = arg.slice("--export=".length);
        else if (!arg.startsWith("-") && !args.component) args.component = arg;
    }
    return args;
}

function toPascalCase(kebab) {
    return kebab
        .split(/[-_]/)
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join("");
}

function toCamelCase(kebab) {
    const pascal = toPascalCase(kebab);
    return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

function mappingFile(component) {
    return `import type { ComponentMapping } from "../../matches-govuk-helpers/mapping.js";

// Describe only where this component's prop API diverges from govuk's macro
// options. mapOptions() already handles the common cases (text/html -> children,
// attributes -> props, passthrough of id/name/type/value/href), so most
// components need only a classesToProps and/or a small transform.
//
// Only map classes/options that appear in GOVUK fixtures — never i.AI-only
// variants (they are not in the oracle, so the mapping would be dead code).
export const ${toCamelCase(component)}Mapping: ComponentMapping = {
    // classesToProps(classes) {
    //     const set = new Set(classes.split(/\\s+/).filter(Boolean));
    //     return { /* e.g. */ };
    // },
    // transform(options, props) {
    //     /* e.g. if (options.disabled) props.disabled = true; */
    // },
};
`;
}

function testFile(component, exportName, fw) {
    const mappingConst = `${toCamelCase(component)}Mapping`;
    const asyncKw = fw.async ? "async " : "";
    const awaitKw = fw.async ? "await " : "";
    return `import { describe, it, expect } from "vitest";
import { ${exportName} } from "@i-dot-ai-npm/component-library-${fw.pkg}";
import { ${fw.render} } from "../../../render/${fw.key}.js";
import { casesFor, toShape } from "../../../matches-govuk-helpers/cases.js";
import { ${mappingConst} } from "../match-govuk-mappings.js";

describe("${exportName} — ${fw.label} matches govuk fixture shape", () => {
    for (const testCase of casesFor("${component}", ${mappingConst})) {
        it(testCase.name, ${asyncKw}() => {
            const html = ${awaitKw}${fw.render}(${exportName}, testCase.input.props, testCase.input.text);
            expect(toShape(html)).toEqual(testCase.expected);
        });
    }
});
`;
}

function main() {
    const args = parseArgs(process.argv.slice(2));

    if (!args.component) {
        console.error("Usage: node scripts/scaffold.mjs <component> [--export=Name] [--force] [--dry-run]");
        console.error("       <component> is the kebab-case folder name, e.g. phase-banner");
        process.exit(1);
    }

    const component = args.component;
    const exportName = args.exportName ?? toPascalCase(component);

    // Warn (don't fail) if there's no govuk fixture — the author may be adding an
    // i.AI-only component, which needs a different loader (see CONTRIBUTING.md).
    if (!hasGovukFixture(component)) {
        console.warn(`warning: no govuk fixtures.json found for "${component}"`);
        console.warn("         casesFor() will yield nothing — this component may be i.AI-only (out of scope for now).");
    }

    const componentDir = join(COMPONENT_TESTS_DIR, component);
    const testsDir = join(componentDir, "tests");

    const files = [
        { path: join(componentDir, "match-govuk-mappings.ts"), content: mappingFile(component) },
        ...FRAMEWORKS.map((fw) => ({
            path: join(testsDir, `govuk-match.${fw.key}.test.${fw.ext}`),
            content: testFile(component, exportName, fw),
        })),
    ];

    const existing = files.filter((f) => existsSync(f.path));
    if (existing.length > 0 && !args.force) {
        console.error(`refusing to overwrite existing files for "${component}" (use --force):`);
        for (const f of existing) console.error(`  ${f.path}`);
        process.exit(1);
    }

    console.log(`Scaffolding govuk-match tests for "${component}" (export: ${exportName})`);
    if (args.dryRun) console.log("(dry run — no files written)\n");

    for (const f of files) {
        const rel = f.path.slice(TESTS_ROOT.length + 1);
        if (args.dryRun) {
            console.log(`would write  ${rel}`);
            continue;
        }
        mkdirSync(dirname(f.path), { recursive: true });
        writeFileSync(f.path, f.content, "utf8");
        console.log(`  wrote  ${rel}`);
    }

    if (!args.dryRun) {
        console.log(`\nNext:`);
        console.log(`  1. Fill in tests/src/component-tests/${component}/match-govuk-mappings.ts`);
        console.log(`  2. If "${exportName}" isn't the right export, re-run with --export=<Name> --force`);
        console.log(`  3. Composite components need examples/content files — see CONTRIBUTING.md (Tier 2)`);
        console.log(`  4. Run: pnpm test`);
    }
}

main();
