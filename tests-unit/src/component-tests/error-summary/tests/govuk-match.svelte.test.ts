import { describe, it, expect } from "vitest";
import { renderSvelte } from "../../../render/svelte.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { errorSummaryFixtures } from "../match-govuk-mappings.js";
import FixtureErrorSummary from "../examples/FixtureErrorSummary.svelte";

describe("Matches govuk fixture shape - ErrorSummary", () => {
    for (const fixture of errorSummaryFixtures()) {
        it(fixture.name, () => {
            const html = renderSvelte(FixtureErrorSummary as never, {
                titleText: fixture.titleText,
                descriptionText: fixture.descriptionText,
                errorList: fixture.errorList,
            });
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
