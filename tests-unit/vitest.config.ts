import { defineConfig } from "vitest/config";
import solid from "vite-plugin-solid";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { fileURLToPath } from "node:url";
import { SuiteReporter } from "./suite-reporter.js";

const contentAlias = {
    "@content": fileURLToPath(new URL("../frontend/src/content", import.meta.url)),
};

/**
 * One project per framework, matched by filename convention:
 *
 *   *.react.test.tsx   -> react   (esbuild automatic JSX)
 *   *.solid.test.tsx   -> solid   (vite-plugin-solid babel transform)
 *   *.svelte.test.ts   -> svelte  (vite-plugin-svelte)
 *   *.astro.test.ts    -> astro   (astro Container API, see vitest.astro.config.ts)
 *
 * Each framework needs its own transform pipeline, so they can't share a
 * single project — but every test file targets exactly one framework.
 */
export default defineConfig({
    test: {
        // Show each suite (describe) name, but not passing variants; failing
        // tests still print their full name + error. See ./suite-reporter.ts.
        reporters: [new SuiteReporter()],
        projects: [
            {
                esbuild: { jsx: "automatic", jsxImportSource: "react" },
                resolve: { alias: contentAlias },
                test: {
                    name: "react",
                    include: ["src/**/*.react.test.tsx"],
                    environment: "node",
                },
            },
            {
                plugins: [solid({ ssr: true })],
                // Align the base transformer's JSX with the `@jsxImportSource
                // solid-js` pragma so it doesn't warn; vite-plugin-solid's babel
                // pass still does the real transform.
                esbuild: { jsx: "automatic", jsxImportSource: "solid-js" },
                resolve: { conditions: ["solid", "node"], alias: contentAlias },
                ssr: { noExternal: [/solid-js/, /@i-dot-ai-npm/] },
                test: {
                    name: "solid",
                    include: ["src/**/*.solid.test.tsx"],
                    environment: "node",
                    server: { deps: { inline: [/solid-js/, /@i-dot-ai-npm/] } },
                },
            },
            {
                plugins: [svelte()],
                resolve: { alias: contentAlias },
                test: {
                    name: "svelte",
                    include: ["src/**/*.svelte.test.ts"],
                    environment: "node",
                },
            },
            "./vitest.astro.config.ts",
        ],
    },
});
