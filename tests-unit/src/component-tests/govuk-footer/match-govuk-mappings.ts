import { loadFixtures } from "../../matches-govuk-helpers/oracle.js";

export type FooterNavItem = { href?: string; text?: string; attributes?: Record<string, string> };
export type FooterNav = { title?: string; columns?: number; width?: string; items?: FooterNavItem[] };
export type FooterMetaItem = { href?: string; text?: string; attributes?: Record<string, string> };
export type FooterMeta = {
    visuallyHiddenTitle?: string;
    items?: FooterMetaItem[];
    text?: string;
    html?: string;
};
export type FooterLicence = { text?: string; html?: string } | null | undefined;
export type FooterCopyright = { text?: string; html?: string } | undefined;

export type FooterData = {
    name: string;
    navigation?: FooterNav[];
    meta?: FooterMeta;
    contentLicence: FooterLicence;
    copyright: FooterCopyright;
    expectedHtml: string;
};

type FooterOptions = {
    navigation?: FooterNav[];
    meta?: FooterMeta;
    contentLicence?: FooterLicence;
    copyright?: FooterCopyright;
};

/** Every non-hidden footer fixture, as structured data. */
export function footerFixtures(): FooterData[] {
    return loadFixtures("footer").map((fixture) => {
        const options = fixture.options as FooterOptions;
        return {
            name: fixture.name,
            navigation: options.navigation,
            meta: options.meta,
            // `null` (explicit) means "no content licence"; `undefined` means default.
            contentLicence: "contentLicence" in options ? options.contentLicence : undefined,
            copyright: options.copyright,
            expectedHtml: fixture.html,
        };
    });
}
