import type { ReactNode } from "react";
import {
    FormGroup,
    Fieldset,
    FieldsetLegend,
    Hint,
    ErrorMessage,
    InputLabel,
    DateInput,
    DateInputItem,
    DateInputField,
} from "@i-dot-ai-npm/component-library-react";
import type { DateInputData } from "../match-govuk-mappings.js";

export function renderDateInput(data: DateInputData): ReactNode {
    return (
        <FormGroup class={data.hasError ? "govuk-form-group--error" : undefined}>
            <Fieldset role="group" aria-describedby={data.describedBy || undefined}>
                <FieldsetLegend>{data.legend}</FieldsetLegend>
                {data.hintText !== undefined && <Hint id={data.hintId}>{data.hintText}</Hint>}
                {data.errorText !== undefined && (
                    <ErrorMessage id={data.errorId}>{data.errorText}</ErrorMessage>
                )}
                <DateInput id={data.id}>
                    {data.items.map((item) => (
                        <DateInputItem key={item.id}>
                            <FormGroup>
                                <InputLabel class="govuk-date-input__label" htmlFor={item.id}>
                                    {item.label}
                                </InputLabel>
                                <DateInputField
                                    id={item.id}
                                    name={item.name}
                                    class={item.inputClasses}
                                    {...(item.value !== undefined ? { value: item.value } : {})}
                                />
                            </FormGroup>
                        </DateInputItem>
                    ))}
                </DateInput>
            </Fieldset>
        </FormGroup>
    );
}
