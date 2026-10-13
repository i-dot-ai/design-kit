import { describe, it, expect } from "vitest";
import { renderAstro } from "../../../render/astro.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { characterCountFixtures } from "../match-govuk-mappings.js";
import FixtureCharacterCount from "../examples/FixtureCharacterCount.astro";

describe("Matches govuk fixture shape - CharacterCount", () => {
    for (const fixture of characterCountFixtures()) {
        it(fixture.name, async () => {
            const html = await renderAstro(FixtureCharacterCount as never, { ...fixture });
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
