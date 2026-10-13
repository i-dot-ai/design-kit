import { describe, it, expect } from "vitest";
import { BackLink } from "@i-dot-ai-npm/component-library-react";
import { renderReact } from "../../../render/react.js";
import { casesFor, toShape } from "../../../matches-govuk-helpers/cases.js";
import { backLinkMapping } from "../match-govuk-mappings.js";

describe("Matches govuk fixture shape - BackLink", () => {
    for (const testCase of casesFor("back-link", backLinkMapping)) {
        it(testCase.name, () => {
            const html = renderReact(BackLink, testCase.input.props, testCase.input.text);
            expect(toShape(html)).toEqual(testCase.expected);
        });
    }
});
