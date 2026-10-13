import { describe, it, expect } from "vitest";
import { renderSvelte } from "../../../render/svelte.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { detailsFixtures } from "../match-govuk-mappings.js";
import FixtureDetails from "../examples/FixtureDetails.svelte";

describe("Matches govuk fixture shape - Details", () => {
    for (const fixture of detailsFixtures()) {
        it(fixture.name, () => {
            const html = renderSvelte(FixtureDetails as never, {
                id: fixture.id,
                open: fixture.open,
                summaryText: fixture.summaryText,
                summaryHtml: fixture.summaryHtml,
                text: fixture.text,
                html: fixture.html,
            });
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
