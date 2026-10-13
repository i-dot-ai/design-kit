/** @jsxImportSource solid-js */
import type { JSX } from "solid-js";
import {
    FormGroup,
    InputLabel,
    Hint,
    ErrorMessage,
    Input,
} from "@i-dot-ai-npm/component-library-solid";
import type { FormFieldData } from "../match-govuk-mappings.js";

export function renderInput(field: FormFieldData): JSX.Element {
    return (
        <FormGroup class={field.error ? "govuk-form-group--error" : undefined}>
            <InputLabel for={field.id} size={field.labelSize}>
                {field.label}
            </InputLabel>
            {field.hint && <Hint id={`${field.id}-hint`}>{field.hint}</Hint>}
            {field.error && (
                <ErrorMessage id={`${field.id}-error`}>{field.error}</ErrorMessage>
            )}
            <Input
                id={field.id}
                name={field.inputName}
                error={Boolean(field.error)}
                width={field.width}
                extraLetterSpacing={field.extraLetterSpacing}
                value={field.value}
                aria-describedby={field.describedBy}
            />
        </FormGroup>
    );
}
