import { describe, it, expect } from "vitest";
import { renderReact } from "../../../render/react.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { summaryListFixtures } from "../match-govuk-mappings.js";
import { renderSummaryList } from "../examples/summary-list.react.jsx";

describe("Matches govuk fixture shape - SummaryList", () => {
    for (const fixture of summaryListFixtures()) {
        it(fixture.name, () => {
            const html = renderReact(() => renderSummaryList(fixture), {});
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
