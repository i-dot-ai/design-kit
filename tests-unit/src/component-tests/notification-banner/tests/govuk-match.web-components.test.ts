import { describe, it, expect } from "vitest";
import { renderHtml, esc, attrs } from "../../../render/web-components.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { notificationBannerFixtures, type NotificationBannerData } from "../match-govuk-mappings.js";

const markup = (d: NotificationBannerData) =>
    `<iai-notification-banner${attrs({ success: d.success })}><iai-notification-banner-header><iai-notification-banner-title>${esc(d.titleText)}</iai-notification-banner-title></iai-notification-banner-header><iai-notification-banner-content>${
        d.html ?? `<iai-notification-banner-heading>${esc(d.text ?? "")}</iai-notification-banner-heading>`
    }</iai-notification-banner-content></iai-notification-banner>`;

describe("Matches govuk fixture shape - NotificationBanner", () => {
    for (const fixture of notificationBannerFixtures()) {
        it(fixture.name, () => {
            const html = renderHtml(markup(fixture));
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
