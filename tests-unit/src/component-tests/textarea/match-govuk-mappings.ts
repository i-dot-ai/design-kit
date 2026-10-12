import { loadFixtures } from "../../matches-govuk-helpers/oracle.js";

export type TextareaFieldData = {
    name: string;
    id: string;
    inputName: string;
    label: string;
    hint?: string;
    error?: string;
    rows: number;
    value?: string;
    describedBy?: string;
    expectedHtml: string;
};

type TextareaOptions = {
    id?: string;
    name?: string;
    label?: { text?: string; isPageHeading?: boolean };
    hint?: { text?: string; html?: string };
    errorMessage?: { text?: string; html?: string };
    rows?: number;
    value?: string;
};

export function textareaFixtures(): TextareaFieldData[] {
    return loadFixtures("textarea")
        .filter((fixture) => {
            const options = fixture.options as TextareaOptions;
            return (
                !options.label?.isPageHeading &&
                options.hint?.html === undefined &&
                options.errorMessage?.html === undefined
            );
        })
        .map((fixture) => {
            const options = fixture.options as TextareaOptions;
            const id = options.id ?? options.name ?? "";
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
                rows: options.rows ?? 5,
                value: options.value,
                describedBy: describedByIds.length ? describedByIds.join(" ") : undefined,
                expectedHtml: fixture.html,
            };
        });
}
