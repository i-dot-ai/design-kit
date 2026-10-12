import { describe, it, expect } from "vitest";
import { renderSvelte } from "../../../render/svelte.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { paginationFixtures } from "../match-govuk-mappings.js";
import FixturePagination from "../examples/FixturePagination.svelte";

describe("Matches govuk fixture shape - Pagination", () => {
    for (const fixture of paginationFixtures()) {
        it(fixture.name, () => {
            const html = renderSvelte(FixturePagination as never, {
                block: fixture.block,
                previous: fixture.previous,
                next: fixture.next,
                items: fixture.items,
            });
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
