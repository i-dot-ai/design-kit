import { describe, it, expect } from "vitest";
import { renderSvelte } from "../../../render/svelte.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { characterCountFixtures } from "../match-govuk-mappings.js";
import FixtureCharacterCount from "../examples/FixtureCharacterCount.svelte";

describe("Matches govuk fixture shape - CharacterCount", () => {
    for (const fixture of characterCountFixtures()) {
        it(fixture.name, () => {
            const html = renderSvelte(FixtureCharacterCount as never, { ...fixture });
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
