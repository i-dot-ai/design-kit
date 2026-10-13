import { describe, it, expect } from "vitest";
import { WarningText } from "@i-dot-ai-npm/component-library-astro";
import { renderAstro } from "../../../render/astro.js";
import { casesFor, toShape } from "../../../matches-govuk-helpers/cases.js";
import { warningTextMapping } from "../match-govuk-mappings.js";

describe("Matches govuk fixture shape - WarningText", () => {
    for (const testCase of casesFor("warning-text", warningTextMapping)) {
        it(testCase.name, async () => {
            const html = await renderAstro(WarningText, testCase.input.props, testCase.input.text);
            expect(toShape(html)).toEqual(testCase.expected);
        });
    }
});
