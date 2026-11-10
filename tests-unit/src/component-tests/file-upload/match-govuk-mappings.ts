import { loadFixtures } from "../../matches-govuk-helpers/oracle.js";

export type FileUploadFieldData = {
    name: string;
    id: string;
    inputName: string;
    label: string;
    hint?: string;
    error?: string;
    describedBy?: string;
    multiple?: boolean;
    expectedHtml: string;
};

type FileUploadOptions = {
    id?: string;
    name?: string;
    label?: { text?: string; isPageHeading?: boolean };
    hint?: { text?: string; html?: string };
    errorMessage?: { text?: string; html?: string };
    javascript?: boolean;
    multiple?: boolean;
    wrapperClasses?: string;
    wrapperAttributes?: Record<string, string>;
    chooseFilesButtonText?: string;
};

/**
 * The components always render the enhanced markup (`govuk-file-upload-wrapper`
 * with `data-module="govuk-file-upload"`), so only the `enhanced` fixtures can
 * match. Variants needing markup our components do not expose — wrapper
 * classes/attributes, translations, page-heading labels, HTML hints/errors —
 * are excluded.
 */
export function fileUploadFixtures(): FileUploadFieldData[] {
    return loadFixtures("file-upload")
        .filter((fixture) => {
            const options = fixture.options as FileUploadOptions;
            return (
                options.javascript &&
                !options.label?.isPageHeading &&
                options.hint?.html === undefined &&
                options.errorMessage?.html === undefined &&
                options.wrapperClasses === undefined &&
                options.wrapperAttributes === undefined &&
                options.chooseFilesButtonText === undefined
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
                multiple: options.multiple === true,
                expectedHtml: fixture.html,
            };
        });
}
