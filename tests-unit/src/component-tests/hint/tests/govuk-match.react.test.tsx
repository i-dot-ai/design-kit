import { describe, it, expect } from "vitest";
import { Hint } from "@i-dot-ai-npm/component-library-react";
import { renderReact } from "../../../render/react.js";
import { casesFor, toShape } from "../../../matches-govuk-helpers/cases.js";
import { hintMapping } from "../match-govuk-mappings.js";

describe("Matches govuk fixture shape - Hint", () => {
    for (const testCase of casesFor("hint", hintMapping, { skipHtmlContent: true })) {
        it(testCase.name, () => {
            const html = renderReact(Hint, testCase.input.props, testCase.input.text);
            expect(toShape(html)).toEqual(testCase.expected);
        });
    }
});
