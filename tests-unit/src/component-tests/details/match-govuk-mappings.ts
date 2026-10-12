import { loadFixtures } from "../../matches-govuk-helpers/oracle.js";

export type DetailsData = {
    name: string;
    id?: string;
    open: boolean;
    summaryText?: string;
    summaryHtml?: string;
    text?: string;
    html?: string;
    expectedHtml: string;
};

type DetailsOptions = {
    id?: string;
    open?: boolean;
    summaryText?: string;
    summaryHtml?: string;
    text?: string;
    html?: string;
};

/** Every non-hidden details fixture, as structured data. */
export function detailsFixtures(): DetailsData[] {
    return loadFixtures("details").map((fixture) => {
        const options = fixture.options as DetailsOptions;
        return {
            name: fixture.name,
            id: options.id,
            open: options.open === true,
            summaryText: options.summaryText,
            summaryHtml: options.summaryHtml,
            text: options.text,
            html: options.html,
            expectedHtml: fixture.html,
        };
    });
}
