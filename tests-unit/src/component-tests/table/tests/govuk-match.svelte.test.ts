import { describe, it, expect } from "vitest";
import { renderSvelte } from "../../../render/svelte.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { tableFixtures } from "../match-govuk-mappings.js";
import FixtureTable from "../examples/FixtureTable.svelte";

describe("Matches govuk fixture shape - Table", () => {
    for (const fixture of tableFixtures()) {
        it(fixture.name, () => {
            const html = renderSvelte(FixtureTable as never, {
                caption: fixture.caption,
                captionSize: fixture.captionSize,
                firstCellIsHeader: fixture.firstCellIsHeader,
                head: fixture.head,
                rows: fixture.rows,
            });
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
