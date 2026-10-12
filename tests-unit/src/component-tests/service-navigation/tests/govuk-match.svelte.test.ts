import { describe, it, expect } from "vitest";
import { renderSvelte } from "../../../render/svelte.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { serviceNavFixtures } from "../match-govuk-mappings.js";
import FixtureServiceNav from "../examples/FixtureServiceNav.svelte";

describe("Matches govuk fixture shape - ServiceNavigation", () => {
    for (const fixture of serviceNavFixtures()) {
        it(fixture.name, () => {
            const html = renderSvelte(FixtureServiceNav as never, {
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
