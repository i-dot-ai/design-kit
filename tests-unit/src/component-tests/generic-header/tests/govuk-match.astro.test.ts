import { describe, it, expect } from "vitest";
import { Header } from "@i-dot-ai-npm/component-library-astro";
import { renderAstro } from "../../../render/astro.js";
import { casesFor, toShape } from "../../../matches-govuk-helpers/cases.js";
import { genericHeaderMapping, genericHeaderTextCases } from "../match-govuk-mappings.js";

describe("Matches govuk fixture shape - Header", () => {
    for (const testCase of casesFor("generic-header", genericHeaderMapping)) {
        if (!genericHeaderTextCases.has(testCase.name)) continue;
        it(testCase.name, async () => {
            const html = await renderAstro(Header, testCase.input.props, testCase.input.text);
            expect(toShape(html)).toEqual(testCase.expected);
        });
    }
});
