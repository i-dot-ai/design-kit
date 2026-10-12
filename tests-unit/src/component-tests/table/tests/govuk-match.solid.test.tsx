import { describe, it, expect } from "vitest";
import { renderSolid } from "../../../render/solid.jsx";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { tableFixtures } from "../match-govuk-mappings.js";
import { renderTable } from "../examples/table.solid.jsx";

describe("Matches govuk fixture shape - Table", () => {
    for (const fixture of tableFixtures()) {
        it(fixture.name, () => {
            const html = renderSolid(() => renderTable(fixture), {});
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
