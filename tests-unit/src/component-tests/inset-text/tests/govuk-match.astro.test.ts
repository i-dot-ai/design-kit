import { describe, it, expect } from "vitest";
import { InsetText } from "@i-dot-ai-npm/component-library-astro";
import { renderAstro } from "../../../render/astro.js";
import { casesFor, toShape } from "../../../matches-govuk-helpers/cases.js";
import { insetTextMapping } from "../match-govuk-mappings.js";

describe("Matches govuk fixture shape - InsetText", () => {
    for (const testCase of casesFor("inset-text", insetTextMapping)) {
        it(testCase.name, async () => {
            const html = await renderAstro(InsetText, testCase.input.props, testCase.input.text);
            expect(toShape(html)).toEqual(testCase.expected);
        });
    }
});
