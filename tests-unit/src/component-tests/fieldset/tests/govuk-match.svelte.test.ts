import { describe, it, expect } from "vitest";
import { renderSvelte } from "../../../render/svelte.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { fieldsetFixtures } from "../match-govuk-mappings.js";
import FixtureFieldset from "../examples/FixtureFieldset.svelte";

describe("Matches govuk fixture shape - Fieldset", () => {
    for (const fixture of fieldsetFixtures()) {
        it(fixture.name, () => {
            const html = renderSvelte(FixtureFieldset as never, {
                size: fixture.size,
                isPageHeading: fixture.isPageHeading,
                legendText: fixture.legendText,
            });
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
