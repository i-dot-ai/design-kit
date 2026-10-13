import { describe, it, expect } from "vitest";
import { Label } from "@i-dot-ai-npm/component-library-astro";
import { renderAstro } from "../../../render/astro.js";
import { casesFor, toShape } from "../../../matches-govuk-helpers/cases.js";
import { labelMapping } from "../match-govuk-mappings.js";

describe("Matches govuk fixture shape - Label", () => {
    for (const testCase of casesFor("label", labelMapping)) {
        it(testCase.name, async () => {
            const html = await renderAstro(Label, testCase.input.props, testCase.input.text);
            expect(toShape(html)).toEqual(testCase.expected);
        });
    }
});
