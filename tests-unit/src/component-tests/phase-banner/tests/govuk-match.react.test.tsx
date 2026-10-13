import { describe, it, expect } from "vitest";
import { renderReact } from "../../../render/react.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { phaseBannerFixtures } from "../match-govuk-mappings.js";
import { renderPhaseBanner } from "../examples/phase-banner.react.jsx";

describe("Matches govuk fixture shape - PhaseBanner", () => {
    for (const fixture of phaseBannerFixtures()) {
        it(fixture.name, () => {
            const html = renderReact(() => renderPhaseBanner(fixture), {});
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
