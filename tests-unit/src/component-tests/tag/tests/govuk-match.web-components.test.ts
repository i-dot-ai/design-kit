import { describe, it, expect } from "vitest";
import "@i-dot-ai-npm/component-library-web-components";
import { renderWebComponent } from "../../../render/web-components.js";
import { casesFor, toShape } from "../../../matches-govuk-helpers/cases.js";
import { tagMapping } from "../match-govuk-mappings.js";

describe("Matches govuk fixture shape - Tag", () => {
    for (const testCase of casesFor("tag", tagMapping)) {
        it(testCase.name, () => {
            const html = renderWebComponent("iai-tag", testCase.input.props, testCase.input.text);
            expect(toShape(html)).toEqual(testCase.expected);
        });
    }
});
