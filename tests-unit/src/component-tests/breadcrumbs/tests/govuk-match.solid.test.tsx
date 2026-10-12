import { describe, it, expect } from "vitest";
import { renderSolid } from "../../../render/solid.jsx";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { breadcrumbsFixtures } from "../match-govuk-mappings.js";
import { renderBreadcrumbs } from "../examples/breadcrumbs.solid.jsx";

describe("Matches govuk fixture shape - Breadcrumbs", () => {
    for (const fixture of breadcrumbsFixtures()) {
        it(fixture.name, () => {
            const html = renderSolid(() => renderBreadcrumbs(fixture), {});
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
