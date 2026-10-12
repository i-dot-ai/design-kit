import { loadFixtures } from "../../matches-govuk-helpers/oracle.js";

export type SelectOptionData = {
    value?: string;
    text: string;
    selected?: boolean;
    disabled?: boolean;
};

export type SelectFieldData = {
    name: string;
    id: string;
    inputName: string;
    label: string;
    hint?: string;
    error?: string;
    selectClasses?: string;
    items: SelectOptionData[];
    describedBy?: string;
    expectedHtml: string;
};

type SelectOptions = {
    id?: string;
    name?: string;
    label?: { text?: string; isPageHeading?: boolean };
    hint?: { text?: string; html?: string };
    errorMessage?: { text?: string; html?: string };
    classes?: string;
    items?: SelectOptionData[];
};

export function selectFixtures(): SelectFieldData[] {
    return loadFixtures("select")
        .filter((fixture) => {
            const options = fixture.options as SelectOptions;
            return (
                !options.label?.isPageHeading &&
                options.hint?.html === undefined &&
                options.errorMessage?.html === undefined
            );
        })
        .map((fixture) => {
            const options = fixture.options as SelectOptions;
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
                selectClasses: options.classes,
                items: options.items ?? [],
                describedBy: describedByIds.length ? describedByIds.join(" ") : undefined,
                expectedHtml: fixture.html,
            };
        });
}
