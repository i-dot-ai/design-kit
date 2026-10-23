import { describe, it, expect } from "vitest";
import { renderHtml, esc, attrs } from "../../../render/web-components.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { phaseBannerFixtures, type PhaseBannerData } from "../match-govuk-mappings.js";

const markup = (d: PhaseBannerData) =>
    `<iai-phase-banner><iai-tag class="govuk-phase-banner__content__tag">${esc(d.tagText ?? "")}</iai-tag><iai-phase-banner-text>${d.bodyHtml ?? esc(d.bodyText ?? "")}</iai-phase-banner-text></iai-phase-banner>`;

describe("Matches govuk fixture shape - PhaseBanner", () => {
    for (const fixture of phaseBannerFixtures()) {
        it(fixture.name, () => {
            const html = renderHtml(markup(fixture));
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
