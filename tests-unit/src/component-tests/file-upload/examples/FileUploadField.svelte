<script>
    import {
        FormGroup,
        InputLabel,
        Hint,
        ErrorMessage,
        FileUpload,
    } from "@i-dot-ai-npm/component-library-svelte";

    let { field } = $props();
</script>

<FormGroup class={field.error ? "govuk-form-group--error" : ""}>
    <InputLabel for={field.id}>{field.label}</InputLabel>
    {#if field.hint}
        <Hint id={`${field.id}-hint`}>{field.hint}</Hint>
    {/if}
    {#if field.error}
        <ErrorMessage id={`${field.id}-error`}>{field.error}</ErrorMessage>
    {/if}
    <FileUpload
        id={field.id}
        name={field.inputName}
        class={field.error ? "govuk-file-upload--error" : ""}
        aria-describedby={field.describedBy}
    />
</FormGroup>
