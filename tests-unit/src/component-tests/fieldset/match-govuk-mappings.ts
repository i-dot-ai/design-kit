import { loadFixtures } from "../../matches-govuk-helpers/oracle.js";

export type FieldsetData = {
    name: string;
    legendText?: string;
    size?: "small" | "medium" | "large" | "xl";
    isPageHeading: boolean;
    expectedHtml: string;
};

type FieldsetOptions = {
    legend?: { text?: string; classes?: string; isPageHeading?: boolean };
};

const SIZE_FROM_CLASS: Record<string, "small" | "medium" | "large" | "xl"> = {
    "govuk-fieldset__legend--s": "small",
    "govuk-fieldset__legend--m": "medium",
    "govuk-fieldset__legend--l": "large",
    "govuk-fieldset__legend--xl": "xl",
};

/** Every non-hidden fieldset fixture, as structured data. */
export function fieldsetFixtures(): FieldsetData[] {
    return loadFixtures("fieldset").map((fixture) => {
        const legend = (fixture.options as FieldsetOptions).legend ?? {};
        const sizeClass = (legend.classes ?? "")
            .split(/\s+/)
            .find((c) => c in SIZE_FROM_CLASS);
        return {
            name: fixture.name,
            legendText: legend.text,
            size: sizeClass ? SIZE_FROM_CLASS[sizeClass] : undefined,
            isPageHeading: legend.isPageHeading === true,
            expectedHtml: fixture.html,
        };
    });
}
