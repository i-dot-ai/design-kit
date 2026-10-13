import { describe, it, expect } from "vitest";
import { ErrorMessage } from "@i-dot-ai-npm/component-library-react";
import { renderReact } from "../../../render/react.js";
import { casesFor, toShape } from "../../../matches-govuk-helpers/cases.js";
import { errorMessageMapping } from "../match-govuk-mappings.js";

describe("Matches govuk fixture shape - ErrorMessage", () => {
    for (const testCase of casesFor("error-message", errorMessageMapping, { skipHtmlContent: true })) {
        it(testCase.name, () => {
            const html = renderReact(ErrorMessage, testCase.input.props, testCase.input.text);
            expect(toShape(html)).toEqual(testCase.expected);
        });
    }
});
