import { loadFixtures } from "../../matches-govuk-helpers/oracle.js";

export type ActionData = {
    href: string;
    text: string;
    visuallyHiddenText?: string;
};

export type RowData = {
    keyText: string;
    valueText?: string;
    valueHtml?: string;
    rowClass?: string;
    actions: ActionData[];
};

export type CardData = {
    titleText?: string;
    titleHtml?: string;
    actions: ActionData[];
};

export type SummaryListData = {
    name: string;
    noBorder: boolean;
    rows: RowData[];
    /** Present when the fixture wraps the summary list in a summary card. */
    card?: CardData;
    expectedHtml: string;
};

type FixtureRow = {
    key: { text?: string };
    value: { text?: string; html?: string };
    classes?: string;
    actions?: { items?: ActionData[] };
};

type FixtureCard = {
    title?: { text?: string; html?: string };
    actions?: { items?: ActionData[] };
};

type SummaryListOptions = {
    classes?: string;
    rows?: FixtureRow[];
    card?: FixtureCard;
};

/** All non-hidden summary-list fixtures, including summary cards. */
export function summaryListFixtures(): SummaryListData[] {
    return loadFixtures("summary-list").map((fixture) => {
        const options = fixture.options as SummaryListOptions;
        const classes = options.classes ?? "";
        const card = options.card
            ? {
                  titleText: options.card.title?.text,
                  titleHtml: options.card.title?.html,
                  actions: options.card.actions?.items ?? [],
              }
            : undefined;
        return {
            name: fixture.name,
            noBorder: classes.split(/\s+/).includes("govuk-summary-list--no-border"),
            card,
            rows: (options.rows ?? []).map((row) => ({
                keyText: row.key.text ?? "",
                valueText: row.value.text,
                valueHtml: row.value.html,
                rowClass: row.classes,
                actions: row.actions?.items ?? [],
            })),
            expectedHtml: fixture.html,
        };
    });
}

/**
 * The visually-hidden suffix govuk appends to an action link. Inside a summary
 * card the card title is appended in parentheses to every action's hidden text
 * (both card actions and row actions).
 */
export function hiddenSuffix(
    visuallyHiddenText: string | undefined,
    cardTitle: string | undefined,
): string {
    let text = "";
    if (visuallyHiddenText) text += ` ${visuallyHiddenText}`;
    if (cardTitle) text += ` (${cardTitle})`;
    return text;
}
