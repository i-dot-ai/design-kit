import { describe, it, expect } from "vitest";
import { renderAstro } from "../../../render/astro.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { footerFixtures } from "../match-govuk-mappings.js";
import FixtureGovukFooter from "../examples/FixtureGovukFooter.astro";

describe("Matches govuk fixture shape - GovukFooter", () => {
    for (const fixture of footerFixtures()) {
        it(fixture.name, async () => {
            const html = await renderAstro(FixtureGovukFooter as never, {
                navigation: fixture.navigation,
                meta: fixture.meta,
                contentLicence: fixture.contentLicence,
                copyright: fixture.copyright,
            });
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
