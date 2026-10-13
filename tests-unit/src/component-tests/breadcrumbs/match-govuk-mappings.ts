import { loadFixtures } from "../../matches-govuk-helpers/oracle.js";

export type BreadcrumbItemData = {
    text?: string;
    href?: string;
};

export type BreadcrumbsData = {
    name: string;
    inverse: boolean;
    collapseOnMobile: boolean;
    items: BreadcrumbItemData[];
    expectedHtml: string;
};

type BreadcrumbsOptions = {
    classes?: string;
    collapseOnMobile?: boolean;
    items?: { text?: string; href?: string }[];
};

/** Every non-hidden breadcrumbs fixture, as structured data. */
export function breadcrumbsFixtures(): BreadcrumbsData[] {
    return loadFixtures("breadcrumbs").map((fixture) => {
        const options = fixture.options as BreadcrumbsOptions;
        const classes = options.classes ?? "";
        return {
            name: fixture.name,
            inverse: classes.split(/\s+/).includes("govuk-breadcrumbs--inverse"),
            collapseOnMobile: options.collapseOnMobile === true,
            items: (options.items ?? []).map((item) => ({
                text: item.text,
                href: item.href,
            })),
            expectedHtml: fixture.html,
        };
    });
}
