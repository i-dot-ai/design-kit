import { loadFixtures } from "../../matches-govuk-helpers/oracle.js";

export type PageItem = {
    number?: string | number;
    href?: string;
    current: boolean;
    ellipsis: boolean;
};

export type ArrowLink = {
    href: string;
    text?: string;
    labelText?: string;
};

export type PaginationData = {
    name: string;
    block: boolean;
    previous?: ArrowLink;
    next?: ArrowLink;
    items: PageItem[];
    expectedHtml: string;
};

type FixtureArrow = { href?: string; text?: string; labelText?: string };
type FixtureItem = { number?: string | number; href?: string; current?: boolean; ellipsis?: boolean };

type PaginationOptions = {
    previous?: FixtureArrow;
    next?: FixtureArrow;
    items?: FixtureItem[];
};

function arrow(a: FixtureArrow | undefined): ArrowLink | undefined {
    if (!a || !a.href) return undefined;
    return { href: a.href, text: a.text, labelText: a.labelText };
}

/** Every non-hidden pagination fixture, as structured data. */
export function paginationFixtures(): PaginationData[] {
    return loadFixtures("pagination").map((fixture) => {
        const options = fixture.options as PaginationOptions;
        const items = options.items ?? [];
        // govuk: block layout when there are no items but a prev/next exists.
        const block = items.length === 0 && Boolean(options.previous || options.next);
        return {
            name: fixture.name,
            block,
            previous: arrow(options.previous),
            next: arrow(options.next),
            items: items.map((item) => ({
                number: item.number,
                href: item.href,
                current: item.current === true,
                ellipsis: item.ellipsis === true,
            })),
            expectedHtml: fixture.html,
        };
    });
}
