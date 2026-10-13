import { loadFixtures } from "../../matches-govuk-helpers/oracle.js";

export type ErrorItem = {
    text: string;
    href?: string;
};

export type ErrorSummaryData = {
    name: string;
    titleText: string;
    descriptionText?: string;
    errorList: ErrorItem[];
    expectedHtml: string;
};

type ErrorSummaryOptions = {
    titleText?: string;
    descriptionText?: string;
    errorList?: { text?: string; href?: string }[];
};

/** Every non-hidden error-summary fixture, as structured data. */
export function errorSummaryFixtures(): ErrorSummaryData[] {
    return loadFixtures("error-summary").map((fixture) => {
        const options = fixture.options as ErrorSummaryOptions;
        return {
            name: fixture.name,
            titleText: options.titleText ?? "",
            descriptionText: options.descriptionText,
            errorList: (options.errorList ?? []).map((item) => ({
                text: item.text ?? "",
                href: item.href,
            })),
            expectedHtml: fixture.html,
        };
    });
}
