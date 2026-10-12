/** @jsxImportSource solid-js */
import type { JSX } from "solid-js";
import {
    FormGroup,
    Fieldset,
    FieldsetLegend,
    Hint,
    ErrorMessage,
    Checkboxes,
    CheckboxItem,
    CheckboxInput,
    CheckboxLabel,
    CheckboxDivider,
    CheckboxConditional,
} from "@i-dot-ai-npm/component-library-solid";
import type { CheckboxesData, CheckboxItemData } from "../match-govuk-mappings.js";
import { conditionalContent } from "../content/govuk-matched-content.solid.jsx";

function renderItem(item: CheckboxItemData): JSX.Element {
    if ("divider" in item) {
        return <CheckboxDivider>{item.divider}</CheckboxDivider>;
    }
    return (
        <>
            <CheckboxItem>
                <CheckboxInput
                    id={item.id}
                    name={item.itemName}
                    value={item.value}
                    checked={item.checked}
                    data-aria-controls={item.conditionalId}
                    data-behaviour={item.behaviour}
                    aria-describedby={item.describedBy}
                />
                <CheckboxLabel for={item.id}>{item.text}</CheckboxLabel>
                {item.hintId && (
                    <Hint id={item.hintId} class="govuk-checkboxes__hint">
                        {item.hintText}
                    </Hint>
                )}
            </CheckboxItem>
            {item.conditionalId && (
                <CheckboxConditional id={item.conditionalId} hidden={item.conditionalHidden}>
                    {conditionalContent[item.conditionalId]}
                </CheckboxConditional>
            )}
        </>
    );
}

export function renderCheckboxes(data: CheckboxesData): JSX.Element {
    const checkboxes = (
        <Checkboxes
            class={data.checkboxesClasses}
            aria-describedby={!data.hasFieldset ? data.fieldsetDescribedBy : undefined}
        >
            {data.items.map((item) => renderItem(item))}
        </Checkboxes>
    );

    const inner = data.hasFieldset ? (
        <Fieldset aria-describedby={data.fieldsetDescribedBy}>
            {data.legend !== undefined &&
                (data.legendPageHeading ? (
                    <FieldsetLegend class={data.legendClasses}>
                        <h1 class="govuk-fieldset__heading">{data.legend}</h1>
                    </FieldsetLegend>
                ) : (
                    <FieldsetLegend class={data.legendClasses}>
                        {data.legend}
                    </FieldsetLegend>
                ))}
            {data.hintId && <Hint id={data.hintId}>{data.hint}</Hint>}
            {data.errorId && (
                <ErrorMessage id={data.errorId}>{data.error}</ErrorMessage>
            )}
            {checkboxes}
        </Fieldset>
    ) : (
        <>
            {data.hintId && <Hint id={data.hintId}>{data.hint}</Hint>}
            {data.errorId && (
                <ErrorMessage id={data.errorId}>{data.error}</ErrorMessage>
            )}
            {checkboxes}
        </>
    );

    return (
        <FormGroup
            class={[data.error ? "govuk-form-group--error" : "", data.formGroupClasses ?? ""]
                .filter(Boolean)
                .join(" ") || undefined}
        >
            {inner}
        </FormGroup>
    );
}
