import { describe, it, expect } from "vitest";
import { renderReact } from "../../../render/react.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { notificationBannerFixtures } from "../match-govuk-mappings.js";
import { renderNotificationBanner } from "../examples/notification-banner.react.jsx";

describe("Matches govuk fixture shape - NotificationBanner", () => {
    for (const fixture of notificationBannerFixtures()) {
        it(fixture.name, () => {
            const html = renderReact(() => renderNotificationBanner(fixture), {});
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
