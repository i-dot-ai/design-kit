import { loadFixtures } from "../../matches-govuk-helpers/oracle.js";

export type FeedbackData = {
    name: string;
    classes?: string;
    titleText?: string;
    titleHtml?: string;
    text?: string;
    html?: string;
    expectedHtml: string;
};

type FeedbackOptions = {
    classes?: string;
    titleText?: string;
    titleHtml?: string;
    text?: string;
    html?: string;
};

/** Every non-hidden feedback fixture, as structured data. */
export function feedbackFixtures(): FeedbackData[] {
    return loadFixtures("feedback").map((fixture) => {
        const options = fixture.options as FeedbackOptions;
        return {
            name: fixture.name,
            classes: options.classes,
            titleText: options.titleText,
            titleHtml: options.titleHtml,
            text: options.text,
            html: options.html,
            expectedHtml: fixture.html,
        };
    });
}
