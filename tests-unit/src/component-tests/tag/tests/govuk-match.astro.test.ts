import { describe, it, expect } from "vitest";
import { Tag } from "@i-dot-ai-npm/component-library-astro";
import { renderAstro } from "../../../render/astro.js";
import { casesFor, toShape } from "../../../matches-govuk-helpers/cases.js";
import { tagMapping } from "../match-govuk-mappings.js";

describe("Matches govuk fixture shape - Tag", () => {
    for (const testCase of casesFor("tag", tagMapping)) {
        it(testCase.name, async () => {
            const html = await renderAstro(Tag, testCase.input.props, testCase.input.text);
            expect(toShape(html)).toEqual(testCase.expected);
        });
    }
});
