import { describe, it, expect } from "vitest";
import "@i-dot-ai-npm/component-library-web-components";
import { renderWebComponent } from "../../../render/web-components.js";
import { casesFor, toShape } from "../../../matches-govuk-helpers/cases.js";
import { errorMessageMapping } from "../match-govuk-mappings.js";

describe("Matches govuk fixture shape - ErrorMessage", () => {
    for (const testCase of casesFor("error-message", errorMessageMapping)) {
        it(testCase.name, () => {
            const html = renderWebComponent("iai-error-message", testCase.input.props, testCase.input.text);
            expect(toShape(html)).toEqual(testCase.expected);
        });
    }
});
