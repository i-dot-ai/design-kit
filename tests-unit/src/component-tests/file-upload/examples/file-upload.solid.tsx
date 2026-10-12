/** @jsxImportSource solid-js */
import type { JSX } from "solid-js";
import {
    FormGroup,
    InputLabel,
    Hint,
    ErrorMessage,
    FileUpload,
} from "@i-dot-ai-npm/component-library-solid";
import type { FileUploadFieldData } from "../match-govuk-mappings.js";

export function renderFileUpload(field: FileUploadFieldData): JSX.Element {
    return (
        <FormGroup class={field.error ? "govuk-form-group--error" : undefined}>
            <InputLabel for={field.id}>{field.label}</InputLabel>
            {field.hint && <Hint id={`${field.id}-hint`}>{field.hint}</Hint>}
            {field.error && (
                <ErrorMessage id={`${field.id}-error`}>{field.error}</ErrorMessage>
            )}
            <FileUpload
                id={field.id}
                name={field.inputName}
                class={field.error ? "govuk-file-upload--error" : undefined}
                aria-describedby={field.describedBy}
            />
        </FormGroup>
    );
}
