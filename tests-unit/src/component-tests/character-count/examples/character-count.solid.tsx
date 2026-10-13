/** @jsxImportSource solid-js */
import { Show } from "solid-js";
import type { JSX } from "solid-js";
import {
    FormGroup,
    InputLabel,
    Hint,
    ErrorMessage,
    CharacterCount,
    CharacterCountMessage,
} from "@i-dot-ai-npm/component-library-solid";
import type { CharacterCountData } from "../match-govuk-mappings.js";

export function renderCharacterCount(data: CharacterCountData): JSX.Element {
    const groupExtra = [
        data.hasError ? "govuk-form-group--error" : "",
        "govuk-character-count",
    ]
        .filter(Boolean)
        .join(" ");

    const textareaExtra = data.hasError ? "govuk-textarea--error" : undefined;

    const dataAttrs: Record<string, unknown> = { "data-module": "govuk-character-count" };
    if (data.maxlength !== undefined) dataAttrs["data-maxlength"] = data.maxlength;
    if (data.maxwords !== undefined) dataAttrs["data-maxwords"] = data.maxwords;
    if (data.threshold !== undefined) dataAttrs["data-threshold"] = data.threshold;

    const label = (
        <InputLabel class={data.labelClasses} for={data.id}>
            {data.labelText}
        </InputLabel>
    );

    return (
        <FormGroup class={groupExtra} {...dataAttrs}>
            <Show when={data.isPageHeading} fallback={label}>
                <h1 class="govuk-label-wrapper">{label}</h1>
            </Show>
            <Show when={data.hintText !== undefined}>
                <Hint id={`${data.id}-hint`}>{data.hintText}</Hint>
            </Show>
            <Show when={data.errorText !== undefined}>
                <ErrorMessage id={`${data.id}-error`}>{data.errorText}</ErrorMessage>
            </Show>
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
