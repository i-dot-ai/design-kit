import { loadFixtures } from "../../matches-govuk-helpers/oracle.js";

export type NotificationBannerData = {
    name: string;
    success: boolean;
    titleText: string;
    text?: string;
    html?: string;
    expectedHtml: string;
};

type NotificationBannerOptions = {
    type?: string;
    titleText?: string;
    text?: string;
    html?: string;
};

/** Every non-hidden notification-banner fixture, as structured data. */
export function notificationBannerFixtures(): NotificationBannerData[] {
    return loadFixtures("notification-banner").map((fixture) => {
        const options = fixture.options as NotificationBannerOptions;
        const success = options.type === "success";
        return {
            name: fixture.name,
            success,
            titleText: options.titleText ?? (success ? "Success" : "Important"),
            text: options.text,
            html: options.html,
            expectedHtml: fixture.html,
        };
    });
}
