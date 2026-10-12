import { describe, it, expect } from "vitest";
import { InsetText } from "@i-dot-ai-npm/component-library-react";
import { renderReact } from "../../../render/react.js";
import { casesFor, toShape } from "../../../matches-govuk-helpers/cases.js";
import { insetTextMapping } from "../match-govuk-mappings.js";

describe("Matches govuk fixture shape - InsetText", () => {
    for (const testCase of casesFor("inset-text", insetTextMapping, { skipHtmlContent: true })) {
        it(testCase.name, () => {
            const html = renderReact(InsetText, testCase.input.props, testCase.input.text);
            expect(toShape(html)).toEqual(testCase.expected);
        });
    }
});
