<script>
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
    } from "@i-dot-ai-npm/component-library-svelte";

    let { id, legend, hintId, hintText, errorId, errorText, hasError, describedBy, items } = $props();
</script>

<FormGroup class={hasError ? "govuk-form-group--error" : ""}>
    <Fieldset role="group" aria-describedby={describedBy || undefined}>
        <FieldsetLegend>{legend}</FieldsetLegend>
        {#if hintText !== undefined}
            <Hint id={hintId}>{hintText}</Hint>
        {/if}
        {#if errorText !== undefined}
            <ErrorMessage id={errorId}>{errorText}</ErrorMessage>
        {/if}
        <DateInput {id}>
            {#each items as item}
                <DateInputItem>
                    <FormGroup>
                        <InputLabel class="govuk-date-input__label" for={item.id}>{item.label}</InputLabel>
                        {#if item.value !== undefined}
                            <DateInputField id={item.id} name={item.name} class={item.inputClasses} value={item.value} />
                        {:else}
                            <DateInputField id={item.id} name={item.name} class={item.inputClasses} />
                        {/if}
                    </FormGroup>
                </DateInputItem>
            {/each}
        </DateInput>
    </Fieldset>
</FormGroup>
