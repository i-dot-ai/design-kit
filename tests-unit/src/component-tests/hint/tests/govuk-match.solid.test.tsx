import { describe, it, expect } from "vitest";
import { Hint } from "@i-dot-ai-npm/component-library-solid";
import { renderSolid } from "../../../render/solid.jsx";
import { casesFor, toShape } from "../../../matches-govuk-helpers/cases.js";
import { hintMapping } from "../match-govuk-mappings.js";

describe("Matches govuk fixture shape - Hint", () => {
    for (const testCase of casesFor("hint", hintMapping, { skipHtmlContent: true })) {
        it(testCase.name, () => {
            const html = renderSolid(Hint, testCase.input.props, testCase.input.text);
            expect(toShape(html)).toEqual(testCase.expected);
        });
    }
});
