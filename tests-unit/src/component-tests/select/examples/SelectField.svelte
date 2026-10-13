<script>
    import {
        FormGroup,
        InputLabel,
        Hint,
        ErrorMessage,
        Select,
        SelectOption,
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
    <Select
        id={field.id}
        name={field.inputName}
        error={Boolean(field.error)}
        class={field.selectClasses ?? ""}
        aria-describedby={field.describedBy}
    >
        {#each field.items as item (item.value)}
            <SelectOption
                value={item.value}
                selected={item.selected}
                disabled={item.disabled}
            >{item.text}</SelectOption>
        {/each}
    </Select>
</FormGroup>
