import { describe, it, expect } from "vitest";
import { Header } from "@i-dot-ai-npm/component-library-react";
import { renderReact } from "../../../render/react.js";
import { casesFor, toShape } from "../../../matches-govuk-helpers/cases.js";
import { genericHeaderMapping, genericHeaderTextCases } from "../match-govuk-mappings.js";

describe("Matches govuk fixture shape - Header", () => {
    for (const testCase of casesFor("generic-header", genericHeaderMapping)) {
        if (!genericHeaderTextCases.has(testCase.name)) continue;
        it(testCase.name, () => {
            const html = renderReact(Header, testCase.input.props, testCase.input.text);
            expect(toShape(html)).toEqual(testCase.expected);
        });
    }
});
