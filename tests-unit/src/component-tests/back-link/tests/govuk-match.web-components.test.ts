import { describe, it, expect } from "vitest";
import "@i-dot-ai-npm/component-library-web-components";
import { renderWebComponent } from "../../../render/web-components.js";
import { casesFor, toShape } from "../../../matches-govuk-helpers/cases.js";
import { backLinkMapping } from "../match-govuk-mappings.js";

describe("Matches govuk fixture shape - BackLink", () => {
    for (const testCase of casesFor("back-link", backLinkMapping)) {
        it(testCase.name, () => {
            const html = renderWebComponent("iai-back-link", testCase.input.props, testCase.input.text);
            expect(toShape(html)).toEqual(testCase.expected);
        });
    }
});
