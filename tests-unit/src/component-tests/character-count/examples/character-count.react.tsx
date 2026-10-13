import type { ReactNode } from "react";
import {
    FormGroup,
    InputLabel,
    Hint,
    ErrorMessage,
    CharacterCount,
    CharacterCountMessage,
} from "@i-dot-ai-npm/component-library-react";
import type { CharacterCountData } from "../match-govuk-mappings.js";

export function renderCharacterCount(data: CharacterCountData): ReactNode {
    // FormGroup prepends "govuk-form-group"; add the character-count modifiers.
    const groupExtra = [
        data.hasError ? "govuk-form-group--error" : "",
        "govuk-character-count",
    ]
        .filter(Boolean)
        .join(" ");

    // CharacterCount prepends "govuk-textarea govuk-js-character-count".
    const textareaExtra = data.hasError ? "govuk-textarea--error" : undefined;

    const dataAttrs: Record<string, unknown> = { "data-module": "govuk-character-count" };
    if (data.maxlength !== undefined) dataAttrs["data-maxlength"] = data.maxlength;
    if (data.maxwords !== undefined) dataAttrs["data-maxwords"] = data.maxwords;
    if (data.threshold !== undefined) dataAttrs["data-threshold"] = data.threshold;

    const label = (
        <InputLabel class={data.labelClasses} htmlFor={data.id}>
            {data.labelText}
        </InputLabel>
    );

    return (
        <FormGroup class={groupExtra} {...dataAttrs}>
            {data.isPageHeading ? <h1 className="govuk-label-wrapper">{label}</h1> : label}
            {data.hintText !== undefined && <Hint id={`${data.id}-hint`}>{data.hintText}</Hint>}
            {data.errorText !== undefined && <ErrorMessage id={`${data.id}-error`}>{data.errorText}</ErrorMessage>}
            <CharacterCount
                class={textareaExtra}
                id={data.id}
                name={data.fieldName}
                rows={data.rows}
                aria-describedby={data.describedBy}
            >
                {data.value ?? ""}
            </CharacterCount>
            <CharacterCountMessage id={`${data.id}-info`}>{data.countMessage}</CharacterCountMessage>
        </FormGroup>
    );
}
