import { describe, it, expect } from "vitest";
import { renderAstro } from "../../../render/astro.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { dateInputFixtures } from "../match-govuk-mappings.js";
import FixtureDateInput from "../examples/FixtureDateInput.astro";

describe("Matches govuk fixture shape - DateInput", () => {
    for (const fixture of dateInputFixtures()) {
        it(fixture.name, async () => {
            const html = await renderAstro(FixtureDateInput as never, {
                id: fixture.id,
                legend: fixture.legend,
                hintId: fixture.hintId,
                hintText: fixture.hintText,
                errorId: fixture.errorId,
                errorText: fixture.errorText,
                hasError: fixture.hasError,
                describedBy: fixture.describedBy,
                items: fixture.items,
            });
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
