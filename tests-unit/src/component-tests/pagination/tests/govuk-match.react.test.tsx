import { describe, it, expect } from "vitest";
import { renderReact } from "../../../render/react.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { paginationFixtures } from "../match-govuk-mappings.js";
import { renderPagination } from "../examples/pagination.react.jsx";

describe("Matches govuk fixture shape - Pagination", () => {
    for (const fixture of paginationFixtures()) {
        it(fixture.name, () => {
            const html = renderReact(() => renderPagination(fixture), {});
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
