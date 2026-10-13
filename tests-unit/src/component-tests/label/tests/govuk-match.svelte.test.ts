import { describe, it, expect } from "vitest";
import { Label } from "@i-dot-ai-npm/component-library-svelte";
import { renderSvelte } from "../../../render/svelte.js";
import { casesFor, toShape } from "../../../matches-govuk-helpers/cases.js";
import { labelMapping } from "../match-govuk-mappings.js";

describe("Matches govuk fixture shape - Label", () => {
    for (const testCase of casesFor("label", labelMapping)) {
        it(testCase.name, () => {
            const html = renderSvelte(Label, testCase.input.props, testCase.input.text);
            expect(toShape(html)).toEqual(testCase.expected);
        });
    }
});
