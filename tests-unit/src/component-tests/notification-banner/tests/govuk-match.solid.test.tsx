import { describe, it, expect } from "vitest";
import { renderSolid } from "../../../render/solid.jsx";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { notificationBannerFixtures } from "../match-govuk-mappings.js";
import { renderNotificationBanner } from "../examples/notification-banner.solid.jsx";

describe("Matches govuk fixture shape - NotificationBanner", () => {
    for (const fixture of notificationBannerFixtures()) {
        it(fixture.name, () => {
            const html = renderSolid(() => renderNotificationBanner(fixture), {});
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
