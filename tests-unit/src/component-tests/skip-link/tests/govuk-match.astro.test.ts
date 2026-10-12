import { describe, it, expect } from "vitest";
import { SkipLink } from "@i-dot-ai-npm/component-library-astro";
import { renderAstro } from "../../../render/astro.js";
import { casesFor, toShape } from "../../../matches-govuk-helpers/cases.js";
import { skipLinkMapping } from "../match-govuk-mappings.js";

describe("Matches govuk fixture shape - SkipLink", () => {
    for (const testCase of casesFor("skip-link", skipLinkMapping)) {
        it(testCase.name, async () => {
            const html = await renderAstro(SkipLink, testCase.input.props, testCase.input.text);
            expect(toShape(html)).toEqual(testCase.expected);
        });
    }
});
