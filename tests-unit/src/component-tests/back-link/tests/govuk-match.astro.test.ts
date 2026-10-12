import { describe, it, expect } from "vitest";
import { BackLink } from "@i-dot-ai-npm/component-library-astro";
import { renderAstro } from "../../../render/astro.js";
import { casesFor, toShape } from "../../../matches-govuk-helpers/cases.js";
import { backLinkMapping } from "../match-govuk-mappings.js";

describe("Matches govuk fixture shape - BackLink", () => {
    for (const testCase of casesFor("back-link", backLinkMapping)) {
        it(testCase.name, async () => {
            const html = await renderAstro(BackLink, testCase.input.props, testCase.input.text);
            expect(toShape(html)).toEqual(testCase.expected);
        });
    }
});
