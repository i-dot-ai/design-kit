import { describe, it, expect } from "vitest";
import { renderSolid } from "../../../render/solid.jsx";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { serviceNavFixtures } from "../match-govuk-mappings.js";
import { renderServiceNav } from "../examples/service-navigation.solid.jsx";

describe("Matches govuk fixture shape - ServiceNavigation", () => {
    for (const fixture of serviceNavFixtures()) {
        it(fixture.name, () => {
            const html = renderSolid(() => renderServiceNav(fixture), {});
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
