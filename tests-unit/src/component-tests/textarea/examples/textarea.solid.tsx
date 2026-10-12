/** @jsxImportSource solid-js */
import type { JSX } from "solid-js";
import {
    FormGroup,
    InputLabel,
    Hint,
    ErrorMessage,
    Textarea,
} from "@i-dot-ai-npm/component-library-solid";
import type { TextareaFieldData } from "../match-govuk-mappings.js";

export function renderTextarea(field: TextareaFieldData): JSX.Element {
    return (
        <FormGroup class={field.error ? "govuk-form-group--error" : undefined}>
            <InputLabel for={field.id}>{field.label}</InputLabel>
            {field.hint && <Hint id={`${field.id}-hint`}>{field.hint}</Hint>}
            {field.error && (
                <ErrorMessage id={`${field.id}-error`}>{field.error}</ErrorMessage>
            )}
            <Textarea
                id={field.id}
                name={field.inputName}
                rows={field.rows}
                error={Boolean(field.error)}
                aria-describedby={field.describedBy}
                value={field.value}
            />
        </FormGroup>
    );
}
