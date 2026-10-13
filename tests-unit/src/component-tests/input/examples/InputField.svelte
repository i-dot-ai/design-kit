<script>
    import {
        FormGroup,
        InputLabel,
        Hint,
        ErrorMessage,
        Input,
    } from "@i-dot-ai-npm/component-library-svelte";

    let { field } = $props();
</script>

<FormGroup class={field.error ? "govuk-form-group--error" : ""}>
    <InputLabel for={field.id} size={field.labelSize}>
        {field.label}
    </InputLabel>
    {#if field.hint}
        <Hint id={`${field.id}-hint`}>{field.hint}</Hint>
    {/if}
    {#if field.error}
        <ErrorMessage id={`${field.id}-error`}>{field.error}</ErrorMessage>
    {/if}
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
