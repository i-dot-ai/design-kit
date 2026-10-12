import { loadFixtures } from "../../matches-govuk-helpers/oracle.js";

export type SectionData = {
    headingId: string;
    contentId: string;
    summaryId?: string;
    heading: string;
    expanded: boolean;
    summaryText?: string;
    summaryHtml?: string;
    contentText?: string;
    contentHtml?: string;
};

export type AccordionData = {
    name: string;
    id: string;
    sections: SectionData[];
    expectedHtml: string;
};

type FixtureItem = {
    heading: { text?: string; html?: string };
    summary?: { text?: string; html?: string };
    content: { text?: string; html?: string };
    expanded?: boolean;
};

/** Every non-hidden accordion fixture, as structured data. */
export function accordionFixtures(): AccordionData[] {
    return loadFixtures("accordion").map((fixture) => {
        const { id, items } = fixture.options as {
            id: string;
            items: FixtureItem[];
        };

        return {
            name: fixture.name,
            id,
            expectedHtml: fixture.html,
            sections: (items ?? []).filter(Boolean).map((item, i) => ({
                headingId: `${id}-heading-${i + 1}`,
                contentId: `${id}-content-${i + 1}`,
                summaryId: item.summary ? `${id}-summary-${i + 1}` : undefined,
                heading: item.heading.text ?? "",
                expanded: item.expanded === true,
                summaryText: item.summary?.text,
                summaryHtml: item.summary?.html,
                contentText: item.content.text,
                contentHtml: item.content.html,
            })),
        };
    });
}
