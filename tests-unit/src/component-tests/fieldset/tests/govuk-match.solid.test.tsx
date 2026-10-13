import { describe, it, expect } from "vitest";
import { renderSolid } from "../../../render/solid.jsx";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { fieldsetFixtures } from "../match-govuk-mappings.js";
import { renderFieldset } from "../examples/fieldset.solid.jsx";

describe("Matches govuk fixture shape - Fieldset", () => {
    for (const fixture of fieldsetFixtures()) {
        it(fixture.name, () => {
            const html = renderSolid(() => renderFieldset(fixture), {});
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
