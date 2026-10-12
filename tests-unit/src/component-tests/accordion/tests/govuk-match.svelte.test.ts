import { describe, it, expect } from "vitest";
import { renderSvelte } from "../../../render/svelte.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { accordionFixtures } from "../match-govuk-mappings.js";
import FixtureAccordion from "../examples/FixtureAccordion.svelte";

describe("Matches govuk fixture shape - Accordion", () => {
    for (const fixture of accordionFixtures()) {
        it(fixture.name, () => {
            const html = renderSvelte(FixtureAccordion as never, {
                id: fixture.id,
                sections: fixture.sections,
            });
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
