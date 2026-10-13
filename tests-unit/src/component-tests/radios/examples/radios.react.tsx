import type { ReactNode } from "react";
import {
    FormGroup,
    Fieldset,
    FieldsetLegend,
    Hint,
    ErrorMessage,
    Radios,
    RadioItem,
    RadioInput,
    RadioLabel,
    RadioDivider,
    RadioConditional,
} from "@i-dot-ai-npm/component-library-react";
import type { RadiosData, RadioItemData } from "../match-govuk-mappings.js";
import { conditionalContent } from "../content/govuk-matched-content.react.jsx";

function renderItem(item: RadioItemData, fieldName: string): ReactNode {
    if ("divider" in item) {
        return <RadioDivider>{item.divider}</RadioDivider>;
    }
    return (
        <>
            <RadioItem>
                <RadioInput
                    id={item.id}
                    name={fieldName}
                    value={item.value}
                    defaultChecked={item.checked}
                    data-aria-controls={item.conditionalId}
                    aria-describedby={item.describedBy}
                />
                <RadioLabel htmlFor={item.id}>{item.text}</RadioLabel>
                {item.hintId && (
                    <Hint id={item.hintId} class="govuk-radios__hint">
                        {item.hintText}
                    </Hint>
                )}
            </RadioItem>
            {item.conditionalId && (
                <RadioConditional id={item.conditionalId} hidden={item.conditionalHidden}>
                    {conditionalContent[item.conditionalId]}
                </RadioConditional>
            )}
        </>
    );
}

export function renderRadios(data: RadiosData): ReactNode {
    const radios = (
        <Radios
            class={data.radiosClasses}
            aria-describedby={!data.hasFieldset ? data.fieldsetDescribedBy : undefined}
        >
            {data.items.map((item) => renderItem(item, data.fieldName))}
        </Radios>
    );

    const inner = data.hasFieldset ? (
        <Fieldset aria-describedby={data.fieldsetDescribedBy}>
            {data.legend !== undefined &&
                (data.legendPageHeading ? (
                    <FieldsetLegend class={data.legendClasses}>
                        <h1 className="govuk-fieldset__heading">{data.legend}</h1>
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
            {radios}
        </Fieldset>
    ) : (
        <>
            {data.hintId && <Hint id={data.hintId}>{data.hint}</Hint>}
            {data.errorId && (
                <ErrorMessage id={data.errorId}>{data.error}</ErrorMessage>
            )}
            {radios}
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
