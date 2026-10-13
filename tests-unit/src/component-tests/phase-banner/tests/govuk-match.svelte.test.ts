import { describe, it, expect } from "vitest";
import { renderSvelte } from "../../../render/svelte.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { phaseBannerFixtures } from "../match-govuk-mappings.js";
import FixturePhaseBanner from "../examples/FixturePhaseBanner.svelte";

describe("Matches govuk fixture shape - PhaseBanner", () => {
    for (const fixture of phaseBannerFixtures()) {
        it(fixture.name, () => {
            const html = renderSvelte(FixturePhaseBanner as never, {
                tagText: fixture.tagText,
                tagHtml: fixture.tagHtml,
                bodyText: fixture.bodyText,
                bodyHtml: fixture.bodyHtml,
            });
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
