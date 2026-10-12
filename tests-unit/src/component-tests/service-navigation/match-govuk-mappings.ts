import { loadFixtures } from "../../matches-govuk-helpers/oracle.js";

export type NavItem = {
    href?: string;
    text?: string;
    html?: string;
    current: boolean;
    active: boolean;
};

export type ServiceNavData = {
    name: string;
    classes?: string;
    serviceName?: string;
    serviceUrl?: string;
    collapseNavigationOnMobile: boolean;
    hasNavigation: boolean;
    endSlotHtml?: string;
    endSlotInline: boolean;
    items: NavItem[];
    expectedHtml: string;
};

type FixtureItem = {
    href?: string;
    text?: string;
    html?: string;
    current?: boolean;
    active?: boolean;
};

type EndSlot = string | { html?: string; align?: string };

type ServiceNavOptions = {
    classes?: string;
    serviceName?: string;
    serviceUrl?: string;
    navigation?: (FixtureItem | null | false | "")[];
    collapseNavigationOnMobile?: boolean;
    slots?: { end?: EndSlot };
};

/** Every non-hidden service-navigation fixture, as structured data. */
export function serviceNavFixtures(): ServiceNavData[] {
    return loadFixtures("service-navigation").map((fixture) => {
        const options = fixture.options as ServiceNavOptions;
        const items = (options.navigation ?? []).filter(Boolean) as FixtureItem[];

        const end = options.slots?.end;
        const endSlotHtml = typeof end === "string" ? end : end?.html;
        const endSlotInline = typeof end === "object" && end !== null && end.align === "inline";

        // govuk default: collapse (show toggle) when there is more than one item.
        const collapse = options.collapseNavigationOnMobile ?? items.length > 1;

        return {
            name: fixture.name,
            classes: options.classes,
            serviceName: options.serviceName,
            serviceUrl: options.serviceUrl,
            collapseNavigationOnMobile: collapse,
            hasNavigation: items.length > 0,
            endSlotHtml,
            endSlotInline,
            items: items.map((item) => ({
                href: item.href,
                text: item.text,
                html: item.html,
                current: item.current === true,
                active: item.active === true,
            })),
            expectedHtml: fixture.html,
        };
    });
}
