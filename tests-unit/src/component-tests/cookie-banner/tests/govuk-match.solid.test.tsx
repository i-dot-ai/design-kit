import { describe, it, expect } from "vitest";
import { renderSolid } from "../../../render/solid.jsx";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { cookieBannerFixtures } from "../match-govuk-mappings.js";
import { renderCookieBanner } from "../examples/cookie-banner.solid.jsx";

describe("Matches govuk fixture shape - CookieBanner", () => {
    for (const fixture of cookieBannerFixtures()) {
        it(fixture.name, () => {
            const html = renderSolid(() => renderCookieBanner(fixture), {});
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
