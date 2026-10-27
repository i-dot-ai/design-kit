import { describe, it, expect } from "vitest";
import { renderWebComponent } from "../../../render/web-components.js";
import { casesFor, toShape } from "../../../matches-govuk-helpers/cases.js";
import { exitThisPageMapping } from "../match-govuk-mappings.js";

describe("Matches govuk fixture shape - ExitThisPage", () => {
    for (const testCase of casesFor("exit-this-page", exitThisPageMapping)) {
        it(testCase.name, () => {
            const html = renderWebComponent("iai-exit-this-page", testCase.input.props, testCase.input.text || undefined);
            expect(toShape(html)).toEqual(testCase.expected);
        });
    }
});
