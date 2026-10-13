import { loadFixtures } from "../../matches-govuk-helpers/oracle.js";

export type FormFieldData = {
    name: string;
    id: string;
    inputName: string;
    label: string;
    labelSize?: "small" | "medium" | "large" | "xl";
    hint?: string;
    error?: string;
    width?: 2 | 3 | 4 | 5 | 10 | 20 | 30;
    extraLetterSpacing?: boolean;
    value?: string;
    describedBy?: string;
    expectedHtml: string;
};

type InputOptions = {
    id?: string;
    name?: string;
    label?: { text?: string; classes?: string; isPageHeading?: boolean };
    hint?: { text?: string; html?: string };
    errorMessage?: { text?: string; html?: string };
    classes?: string;
    value?: string;
    prefix?: unknown;
    suffix?: unknown;
};

const WIDTHS = [2, 3, 4, 5, 10, 20, 30] as const;

function widthFrom(classes: string): FormFieldData["width"] {
    const match = classes.match(/govuk-input--width-(\d+)/);
    const value = match?.[1] ? Number(match[1]) : undefined;
    return WIDTHS.find((w) => w === value);
}

/**
 * Core input fixtures only — those our FormGroup + Label + Hint + ErrorMessage +
 * Input components can compose. Prefix, suffix and page-heading variants need
 * markup our components do not expose, so they are excluded.
 */
export function inputFixtures(): FormFieldData[] {
    return loadFixtures("input")
        .filter((fixture) => {
            const options = fixture.options as InputOptions;
            return (
                !options.prefix &&
                !options.suffix &&
                !options.label?.isPageHeading &&
                options.hint?.html === undefined &&
                options.errorMessage?.html === undefined
            );
        })
        .map((fixture) => {
            const options = fixture.options as InputOptions;
            const id = options.id ?? options.name ?? "";
            const classes = options.classes ?? "";
            const describedByIds = [
                options.hint ? `${id}-hint` : "",
                options.errorMessage ? `${id}-error` : "",
            ].filter(Boolean);

            return {
                name: fixture.name,
                id,
                inputName: options.name ?? "",
                label: options.label?.text ?? "",
                hint: options.hint?.text,
                error: options.errorMessage?.text,
                width: widthFrom(classes),
                extraLetterSpacing: classes.includes("govuk-input--extra-letter-spacing"),
                value: options.value,
                describedBy: describedByIds.length ? describedByIds.join(" ") : undefined,
                expectedHtml: fixture.html,
            };
        });
}
