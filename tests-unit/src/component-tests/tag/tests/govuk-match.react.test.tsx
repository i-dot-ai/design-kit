import { describe, it, expect } from "vitest";
import { Tag } from "@i-dot-ai-npm/component-library-react";
import { renderReact } from "../../../render/react.js";
import { casesFor, toShape } from "../../../matches-govuk-helpers/cases.js";
import { tagMapping } from "../match-govuk-mappings.js";

describe("Matches govuk fixture shape - Tag", () => {
    for (const testCase of casesFor("tag", tagMapping)) {
        it(testCase.name, () => {
            const html = renderReact(Tag, testCase.input.props, testCase.input.text);
            expect(toShape(html)).toEqual(testCase.expected);
        });
    }
});
