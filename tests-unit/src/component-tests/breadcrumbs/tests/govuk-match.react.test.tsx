import { describe, it, expect } from "vitest";
import { renderReact } from "../../../render/react.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { breadcrumbsFixtures } from "../match-govuk-mappings.js";
import { renderBreadcrumbs } from "../examples/breadcrumbs.react.jsx";

describe("Matches govuk fixture shape - Breadcrumbs", () => {
    for (const fixture of breadcrumbsFixtures()) {
        it(fixture.name, () => {
            const html = renderReact(() => renderBreadcrumbs(fixture), {});
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
