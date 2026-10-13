import { describe, it, expect } from "vitest";
import { renderSvelte } from "../../../render/svelte.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { cookieBannerFixtures } from "../match-govuk-mappings.js";
import FixtureCookieBanner from "../examples/FixtureCookieBanner.svelte";

describe("Matches govuk fixture shape - CookieBanner", () => {
    for (const fixture of cookieBannerFixtures()) {
        it(fixture.name, () => {
            const html = renderSvelte(FixtureCookieBanner as never, { messages: fixture.messages });
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
