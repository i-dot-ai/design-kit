import { describe, it, expect } from "vitest";
import "@i-dot-ai-npm/component-library-web-components";
import { renderWebComponent } from "../../../render/web-components.js";
import { casesFor, toShape } from "../../../matches-govuk-helpers/cases.js";
import { skipLinkMapping } from "../match-govuk-mappings.js";

describe("Matches govuk fixture shape - SkipLink", () => {
    for (const testCase of casesFor("skip-link", skipLinkMapping)) {
        it(testCase.name, () => {
            const html = renderWebComponent("iai-skip-link", testCase.input.props, testCase.input.text);
            expect(toShape(html)).toEqual(testCase.expected);
        });
    }
});
