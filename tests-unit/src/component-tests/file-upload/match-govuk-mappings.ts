import { loadFixtures } from "../../matches-govuk-helpers/oracle.js";

export type FileUploadFieldData = {
    name: string;
    id: string;
    inputName: string;
    label: string;
    hint?: string;
    error?: string;
    describedBy?: string;
    expectedHtml: string;
};

type FileUploadOptions = {
    id?: string;
    name?: string;
    label?: { text?: string; isPageHeading?: boolean };
    hint?: { text?: string; html?: string };
    errorMessage?: { text?: string; html?: string };
    javascript?: boolean;
};

/**
 * Core file-upload fixtures only. The `enhanced` (JavaScript drag-and-drop) and
 * page-heading variants need markup our components do not expose, so they are
 * excluded.
 */
export function fileUploadFixtures(): FileUploadFieldData[] {
    return loadFixtures("file-upload")
        .filter((fixture) => {
            const options = fixture.options as FileUploadOptions;
            return (
                !options.javascript &&
                !options.label?.isPageHeading &&
                options.hint?.html === undefined &&
                options.errorMessage?.html === undefined
            );
        })
        .map((fixture) => {
            const options = fixture.options as FileUploadOptions;
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
                describedBy: describedByIds.length ? describedByIds.join(" ") : undefined,
                expectedHtml: fixture.html,
            };
        });
}
