import { describe, it, expect } from "vitest";
import { WarningText } from "@i-dot-ai-npm/component-library-svelte";
import { renderSvelte } from "../../../render/svelte.js";
import { casesFor, toShape } from "../../../matches-govuk-helpers/cases.js";
import { warningTextMapping } from "../match-govuk-mappings.js";

describe("Matches govuk fixture shape - WarningText", () => {
    for (const testCase of casesFor("warning-text", warningTextMapping)) {
        it(testCase.name, () => {
            const html = renderSvelte(WarningText, testCase.input.props, testCase.input.text);
            expect(toShape(html)).toEqual(testCase.expected);
        });
    }
});
