import { describe, it, expect } from "vitest";
import { renderAstro } from "../../../render/astro.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { serviceNavFixtures } from "../match-govuk-mappings.js";
import FixtureServiceNav from "../examples/FixtureServiceNav.astro";

describe("Matches govuk fixture shape - ServiceNavigation", () => {
    for (const fixture of serviceNavFixtures()) {
        it(fixture.name, async () => {
            const html = await renderAstro(FixtureServiceNav as never, {
                classes: fixture.classes,
                serviceName: fixture.serviceName,
                serviceUrl: fixture.serviceUrl,
                hasNavigation: fixture.hasNavigation,
                collapseNavigationOnMobile: fixture.collapseNavigationOnMobile,
                endSlotHtml: fixture.endSlotHtml,
                endSlotInline: fixture.endSlotInline,
                items: fixture.items,
            });
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
