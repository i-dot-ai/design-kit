import { loadFixtures } from "../../matches-govuk-helpers/oracle.js";

export type CookieAction = {
    text: string;
    type?: string;
    name?: string;
    value?: string;
    href?: string;
};

export type CookieMessage = {
    headingText?: string;
    headingHtml?: string;
    text?: string;
    html?: string;
    role?: string;
    actions: CookieAction[];
};

export type CookieBannerData = {
    name: string;
    messages: CookieMessage[];
    expectedHtml: string;
};

type FixtureMessage = {
    headingText?: string;
    headingHtml?: string;
    text?: string;
    html?: string;
    role?: string;
    actions?: CookieAction[];
};

type CookieBannerOptions = {
    messages?: FixtureMessage[];
};

/** Every non-hidden cookie-banner fixture, as structured data. */
export function cookieBannerFixtures(): CookieBannerData[] {
    return loadFixtures("cookie-banner").map((fixture) => {
        const options = fixture.options as CookieBannerOptions;
        return {
            name: fixture.name,
            messages: (options.messages ?? []).map((m) => ({
                headingText: m.headingText,
                headingHtml: m.headingHtml,
                text: m.text,
                html: m.html,
                role: m.role,
                actions: m.actions ?? [],
            })),
            expectedHtml: fixture.html,
        };
    });
}
