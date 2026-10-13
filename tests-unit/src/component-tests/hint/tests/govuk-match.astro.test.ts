import { describe, it, expect } from "vitest";
import { Hint } from "@i-dot-ai-npm/component-library-astro";
import { renderAstro } from "../../../render/astro.js";
import { casesFor, toShape } from "../../../matches-govuk-helpers/cases.js";
import { hintMapping } from "../match-govuk-mappings.js";

describe("Matches govuk fixture shape - Hint", () => {
    for (const testCase of casesFor("hint", hintMapping)) {
        it(testCase.name, async () => {
            const html = await renderAstro(Hint, testCase.input.props, testCase.input.text);
            expect(toShape(html)).toEqual(testCase.expected);
        });
    }
});
