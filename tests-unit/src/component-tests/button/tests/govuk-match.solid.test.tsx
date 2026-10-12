import { describe, it, expect } from "vitest";
import { Button } from "@i-dot-ai-npm/component-library-solid";
import { renderSolid } from "../../../render/solid.jsx";
import { casesFor, toShape } from "../../../matches-govuk-helpers/cases.js";
import { buttonMapping } from "../match-govuk-mappings.js";

describe("Matches govuk fixture shape - Button", () => {
    for (const testCase of casesFor("button", buttonMapping)) {
        it(testCase.name, () => {
            const html = renderSolid(Button, testCase.input.props, testCase.input.text);
            expect(toShape(html)).toEqual(testCase.expected);
        });
    }
});
