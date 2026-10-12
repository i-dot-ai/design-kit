import { describe, it, expect } from "vitest";
import { Hint } from "@i-dot-ai-npm/component-library-svelte";
import { renderSvelte } from "../../../render/svelte.js";
import { casesFor, toShape } from "../../../matches-govuk-helpers/cases.js";
import { hintMapping } from "../match-govuk-mappings.js";

describe("Matches govuk fixture shape - Hint", () => {
    for (const testCase of casesFor("hint", hintMapping)) {
        it(testCase.name, () => {
            const html = renderSvelte(Hint, testCase.input.props, testCase.input.text);
            expect(toShape(html)).toEqual(testCase.expected);
        });
    }
});
