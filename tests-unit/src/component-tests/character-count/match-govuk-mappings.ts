import { loadFixtures } from "../../matches-govuk-helpers/oracle.js";

export type CharacterCountData = {
    name: string;
    id: string;
    fieldName: string;
    labelText: string;
    labelClasses?: string;
    isPageHeading: boolean;
    hintText?: string;
    errorText?: string;
    hasError: boolean;
    rows: number;
    describedBy: string;
    value?: string;
    countMessage: string;
    maxlength?: number;
    maxwords?: number;
    threshold?: number;
    expectedHtml: string;
};

type CharacterCountOptions = {
    id?: string;
    name?: string;
    maxlength?: number;
    maxwords?: number;
    threshold?: number;
    rows?: number;
    value?: string;
    label?: { text?: string; classes?: string; isPageHeading?: boolean };
    hint?: { text?: string };
    errorMessage?: { text?: string };
};

/** Every non-hidden character-count fixture, as structured data. */
export function characterCountFixtures(): CharacterCountData[] {
    return loadFixtures("character-count").map((fixture) => {
        const options = fixture.options as CharacterCountOptions;
        const id = options.id ?? options.name ?? "";

        const infoId = `${id}-info`;
        const hintId = `${id}-hint`;
        const errorId = `${id}-error`;

        // govuk builds aria-describedby as: info, then hint, then error.
        const parts = [infoId];
        if (options.hint) parts.push(hintId);
        if (options.errorMessage) parts.push(errorId);

        // Auto-generated count message text.
        const limit = options.maxwords ?? options.maxlength;
        const unit = options.maxwords !== undefined ? "words" : "characters";
        const countMessage = `You can enter up to ${limit} ${unit}`;

        return {
            name: fixture.name,
            id,
            fieldName: options.name ?? "",
            labelText: options.label?.text ?? "",
            labelClasses: options.label?.classes,
            isPageHeading: options.label?.isPageHeading === true,
            hintText: options.hint?.text,
            errorText: options.errorMessage?.text,
            hasError: Boolean(options.errorMessage),
            rows: options.rows ?? 5,
            describedBy: parts.join(" "),
            value: options.value,
            countMessage,
            maxlength: options.maxlength,
            maxwords: options.maxwords,
            threshold: options.threshold,
            expectedHtml: fixture.html,
        };
    });
}
