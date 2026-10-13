import { describe, it, expect } from "vitest";
import { renderSvelte } from "../../../render/svelte.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { breadcrumbsFixtures } from "../match-govuk-mappings.js";
import FixtureBreadcrumbs from "../examples/FixtureBreadcrumbs.svelte";

describe("Matches govuk fixture shape - Breadcrumbs", () => {
    for (const fixture of breadcrumbsFixtures()) {
        it(fixture.name, () => {
            const html = renderSvelte(FixtureBreadcrumbs as never, {
                inverse: fixture.inverse,
                collapseOnMobile: fixture.collapseOnMobile,
                items: fixture.items,
            });
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
