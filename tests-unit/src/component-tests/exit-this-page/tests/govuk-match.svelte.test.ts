import { describe, it, expect } from "vitest";
import { ExitThisPage } from "@i-dot-ai-npm/component-library-svelte";
import { renderSvelte } from "../../../render/svelte.js";
import { casesFor, toShape } from "../../../matches-govuk-helpers/cases.js";
import { exitThisPageMapping } from "../match-govuk-mappings.js";

describe("Matches govuk fixture shape - ExitThisPage", () => {
    for (const testCase of casesFor("exit-this-page", exitThisPageMapping)) {
        it(testCase.name, () => {
            const html = renderSvelte(ExitThisPage, testCase.input.props, testCase.input.text || undefined);
            expect(toShape(html)).toEqual(testCase.expected);
        });
    }
});
