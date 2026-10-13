import { describe, it, expect } from "vitest";
import { renderSvelte } from "../../../render/svelte.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { summaryListFixtures } from "../match-govuk-mappings.js";
import FixtureSummaryList from "../examples/FixtureSummaryList.svelte";

describe("Matches govuk fixture shape - SummaryList", () => {
    for (const fixture of summaryListFixtures()) {
        it(fixture.name, () => {
            const html = renderSvelte(FixtureSummaryList as never, {
                noBorder: fixture.noBorder,
                rows: fixture.rows,
                card: fixture.card,
            });
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
