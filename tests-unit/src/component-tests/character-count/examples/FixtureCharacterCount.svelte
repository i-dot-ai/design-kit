<script>
    import {
        FormGroup,
        InputLabel,
        Hint,
        ErrorMessage,
        CharacterCount,
        CharacterCountMessage,
    } from "@i-dot-ai-npm/component-library-svelte";

    let { id, fieldName, labelText, labelClasses, isPageHeading, hintText, errorText, hasError, rows, describedBy, value, countMessage, maxlength, maxwords, threshold } = $props();

    let groupExtra = $derived([hasError ? "govuk-form-group--error" : "", "govuk-character-count"].filter(Boolean).join(" "));
    let textareaExtra = $derived(hasError ? "govuk-textarea--error" : "");
    let dataAttrs = $derived({
        "data-module": "govuk-character-count",
        ...(maxlength !== undefined ? { "data-maxlength": maxlength } : {}),
        ...(maxwords !== undefined ? { "data-maxwords": maxwords } : {}),
        ...(threshold !== undefined ? { "data-threshold": threshold } : {}),
    });
</script>

<FormGroup class={groupExtra} {...dataAttrs}>
    {#if isPageHeading}
        <h1 class="govuk-label-wrapper">
            <InputLabel class={labelClasses} for={id}>{labelText}</InputLabel>
        </h1>
    {:else}
        <InputLabel class={labelClasses} for={id}>{labelText}</InputLabel>
    {/if}
    {#if hintText !== undefined}
        <Hint id={`${id}-hint`}>{hintText}</Hint>
    {/if}
    {#if errorText !== undefined}
        <ErrorMessage id={`${id}-error`}>{errorText}</ErrorMessage>
    {/if}
    <CharacterCount class={textareaExtra} {id} name={fieldName} {rows} aria-describedby={describedBy} {value} />
    <CharacterCountMessage id={`${id}-info`}>{countMessage}</CharacterCountMessage>
</FormGroup>
