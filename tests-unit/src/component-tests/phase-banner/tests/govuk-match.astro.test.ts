import { describe, it, expect } from "vitest";
import { renderAstro } from "../../../render/astro.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { phaseBannerFixtures } from "../match-govuk-mappings.js";
import FixturePhaseBanner from "../examples/FixturePhaseBanner.astro";

describe("Matches govuk fixture shape - PhaseBanner", () => {
    for (const fixture of phaseBannerFixtures()) {
        it(fixture.name, async () => {
            const html = await renderAstro(FixturePhaseBanner as never, {
                tagText: fixture.tagText,
                tagHtml: fixture.tagHtml,
                bodyText: fixture.bodyText,
                bodyHtml: fixture.bodyHtml,
            });
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
