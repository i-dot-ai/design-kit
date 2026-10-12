import { describe, it, expect } from "vitest";
import { renderAstro } from "../../../render/astro.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { notificationBannerFixtures } from "../match-govuk-mappings.js";
import FixtureNotificationBanner from "../examples/FixtureNotificationBanner.astro";

describe("Matches govuk fixture shape - NotificationBanner", () => {
    for (const fixture of notificationBannerFixtures()) {
        it(fixture.name, async () => {
            const html = await renderAstro(FixtureNotificationBanner as never, {
                success: fixture.success,
                titleText: fixture.titleText,
                text: fixture.text,
                html: fixture.html,
            });
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
