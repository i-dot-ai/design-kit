/** @jsxImportSource solid-js */
import { For, Show } from "solid-js";
import type { JSX } from "solid-js";
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
} from "@i-dot-ai-npm/component-library-solid";
import type { DateInputData } from "../match-govuk-mappings.js";

export function renderDateInput(data: DateInputData): JSX.Element {
    return (
        <FormGroup class={data.hasError ? "govuk-form-group--error" : undefined}>
            <Fieldset role="group" aria-describedby={data.describedBy || undefined}>
                <FieldsetLegend>{data.legend}</FieldsetLegend>
                <Show when={data.hintText !== undefined}>
                    <Hint id={data.hintId}>{data.hintText}</Hint>
                </Show>
                <Show when={data.errorText !== undefined}>
                    <ErrorMessage id={data.errorId}>{data.errorText}</ErrorMessage>
                </Show>
                <DateInput id={data.id}>
                    <For each={data.items}>
                        {(item) => (
                            <DateInputItem>
                                <FormGroup>
                                    <InputLabel class="govuk-date-input__label" for={item.id}>
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
                        )}
                    </For>
                </DateInput>
            </Fieldset>
        </FormGroup>
    );
}
