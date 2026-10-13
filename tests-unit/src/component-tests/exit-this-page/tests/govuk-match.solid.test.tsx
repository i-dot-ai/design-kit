import { describe, it, expect } from "vitest";
import { ExitThisPage } from "@i-dot-ai-npm/component-library-solid";
import { renderSolid } from "../../../render/solid.jsx";
import { casesFor, toShape } from "../../../matches-govuk-helpers/cases.js";
import { exitThisPageMapping } from "../match-govuk-mappings.js";

describe("Matches govuk fixture shape - ExitThisPage", () => {
    for (const testCase of casesFor("exit-this-page", exitThisPageMapping)) {
        it(testCase.name, () => {
            const html = renderSolid(ExitThisPage, testCase.input.props, testCase.input.text);
            expect(toShape(html)).toEqual(testCase.expected);
        });
    }
});
