import { describe, it, expect } from "vitest";
import { ExitThisPage } from "@i-dot-ai-npm/component-library-astro";
import { renderAstro } from "../../../render/astro.js";
import { casesFor, toShape } from "../../../matches-govuk-helpers/cases.js";
import { exitThisPageMapping } from "../match-govuk-mappings.js";

describe("Matches govuk fixture shape - ExitThisPage", () => {
    for (const testCase of casesFor("exit-this-page", exitThisPageMapping)) {
        it(testCase.name, async () => {
            const html = await renderAstro(ExitThisPage, testCase.input.props, testCase.input.text || undefined);
            expect(toShape(html)).toEqual(testCase.expected);
        });
    }
});
