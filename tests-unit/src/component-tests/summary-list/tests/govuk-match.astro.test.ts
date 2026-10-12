import { describe, it, expect } from "vitest";
import { renderAstro } from "../../../render/astro.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { summaryListFixtures } from "../match-govuk-mappings.js";
import FixtureSummaryList from "../examples/FixtureSummaryList.astro";

describe("Matches govuk fixture shape - SummaryList", () => {
    for (const fixture of summaryListFixtures()) {
        it(fixture.name, async () => {
            const html = await renderAstro(FixtureSummaryList as never, {
                noBorder: fixture.noBorder,
                rows: fixture.rows,
                card: fixture.card,
            });
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
