import { describe, it, expect } from "vitest";
import { renderSolid } from "../../../render/solid.jsx";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { errorSummaryFixtures } from "../match-govuk-mappings.js";
import { renderErrorSummary } from "../examples/error-summary.solid.jsx";

describe("Matches govuk fixture shape - ErrorSummary", () => {
    for (const fixture of errorSummaryFixtures()) {
        it(fixture.name, () => {
            const html = renderSolid(() => renderErrorSummary(fixture), {});
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
