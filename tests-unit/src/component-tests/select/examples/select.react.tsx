import type { ReactNode } from "react";
import {
    FormGroup,
    InputLabel,
    Hint,
    ErrorMessage,
    Select,
    SelectOption,
} from "@i-dot-ai-npm/component-library-react";
import type { SelectFieldData } from "../match-govuk-mappings.js";

export function renderSelect(field: SelectFieldData): ReactNode {
    return (
        <FormGroup class={field.error ? "govuk-form-group--error" : undefined}>
            <InputLabel htmlFor={field.id}>{field.label}</InputLabel>
            {field.hint && <Hint id={`${field.id}-hint`}>{field.hint}</Hint>}
            {field.error && (
                <ErrorMessage id={`${field.id}-error`}>{field.error}</ErrorMessage>
            )}
            <Select
                id={field.id}
                name={field.inputName}
                error={Boolean(field.error)}
                class={field.selectClasses}
                aria-describedby={field.describedBy}
            >
                {field.items.map((item, index) => (
                    <SelectOption
                        key={index}
                        value={item.value}
                        selected={item.selected}
                        disabled={item.disabled}
                    >
                        {item.text}
                    </SelectOption>
                ))}
            </Select>
        </FormGroup>
    );
}
