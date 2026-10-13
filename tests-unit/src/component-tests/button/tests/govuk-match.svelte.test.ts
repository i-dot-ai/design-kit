import { describe, it, expect } from "vitest";
import { Button } from "@i-dot-ai-npm/component-library-svelte";
import { renderSvelte } from "../../../render/svelte.js";
import { casesFor, toShape } from "../../../matches-govuk-helpers/cases.js";
import { buttonMapping } from "../match-govuk-mappings.js";

describe("Matches govuk fixture shape - Button", () => {
    for (const testCase of casesFor("button", buttonMapping)) {
        it(testCase.name, () => {
            const html = renderSvelte(Button, testCase.input.props, testCase.input.text);
            expect(toShape(html)).toEqual(testCase.expected);
        });
    }
});
