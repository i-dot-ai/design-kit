import { describe, it, expect } from "vitest";
import { renderSolid } from "../../../render/solid.jsx";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { footerFixtures } from "../match-govuk-mappings.js";
import { renderFooter } from "../examples/govuk-footer.solid.jsx";

describe("Matches govuk fixture shape - GovukFooter", () => {
    for (const fixture of footerFixtures()) {
        it(fixture.name, () => {
            const html = renderSolid(() => renderFooter(fixture), {});
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
