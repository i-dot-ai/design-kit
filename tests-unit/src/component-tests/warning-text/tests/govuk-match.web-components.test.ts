import { describe, it, expect } from "vitest";
import "@i-dot-ai-npm/component-library-web-components";
import { renderWebComponent } from "../../../render/web-components.js";
import { casesFor, toShape } from "../../../matches-govuk-helpers/cases.js";
import { warningTextMapping } from "../match-govuk-mappings.js";

describe("Matches govuk fixture shape - WarningText", () => {
    for (const testCase of casesFor("warning-text", warningTextMapping)) {
        it(testCase.name, () => {
            const html = renderWebComponent("iai-warning-text", testCase.input.props, testCase.input.text);
            expect(toShape(html)).toEqual(testCase.expected);
        });
    }
});
