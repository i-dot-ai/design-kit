import { describe, it, expect } from "vitest";
import { GovukHeader } from "@i-dot-ai-npm/component-library-solid";
import { renderSolid } from "../../../render/solid.jsx";
import { casesFor, toShape } from "../../../matches-govuk-helpers/cases.js";
import { govukHeaderMapping } from "../match-govuk-mappings.js";

describe("Matches govuk fixture shape - GovukHeader", () => {
    for (const testCase of casesFor("header", govukHeaderMapping)) {
        it(testCase.name, () => {
            const html = renderSolid(GovukHeader, testCase.input.props, testCase.input.text);
            expect(toShape(html)).toEqual(testCase.expected);
        });
    }
});
