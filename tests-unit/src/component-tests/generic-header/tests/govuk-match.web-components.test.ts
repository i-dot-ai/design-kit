import { describe, it, expect } from "vitest";
import { renderWebComponent } from "../../../render/web-components.js";
import { casesFor, toShape } from "../../../matches-govuk-helpers/cases.js";
import { genericHeaderMapping } from "../match-govuk-mappings.js";

const lower = (props: Record<string, unknown>) => Object.fromEntries(Object.entries(props).map(([k, v]) => [k.toLowerCase(), v]));

describe("Matches govuk fixture shape - Header", () => {
    for (const testCase of casesFor("generic-header", { ...genericHeaderMapping, textFrom: ["logoText", "logoHtml"] })) {
        it(testCase.name, () => {
            const html = renderWebComponent("iai-header", lower(testCase.input.props), testCase.input.text);
            expect(toShape(html)).toEqual(testCase.expected);
        });
    }
});
