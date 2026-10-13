<script>
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
    } from "@i-dot-ai-npm/component-library-svelte";

    let { data } = $props();
</script>

{#snippet items()}
    {#each data.items as item (item.divider ? Math.random() : item.id)}
        {#if item.divider !== undefined}
            <RadioDivider>{item.divider}</RadioDivider>
        {:else}
            <RadioItem>
                <RadioInput
                    id={item.id}
                    name={data.fieldName}
                    value={item.value}
                    checked={item.checked}
                    data-aria-controls={item.conditionalId}
                    aria-describedby={item.describedBy}
                />
                <RadioLabel for={item.id}>
                    {#if item.html}{@html item.html}{:else}{item.text}{/if}
                </RadioLabel>
                {#if item.hintId}
                    <Hint id={item.hintId} class="govuk-radios__hint">{item.hintText}</Hint>
                {/if}
            </RadioItem>
            {#if item.conditionalId}
                <RadioConditional id={item.conditionalId} hidden={item.conditionalHidden}>{@html item.conditionalHtml}</RadioConditional>
            {/if}
        {/if}
    {/each}
{/snippet}

{#snippet radios()}
    <Radios
        class={data.radiosClasses ?? ""}
        aria-describedby={!data.hasFieldset ? data.fieldsetDescribedBy : undefined}
    >
        {@render items()}
    </Radios>
{/snippet}

<FormGroup
    class={[data.error ? "govuk-form-group--error" : "", data.formGroupClasses ?? ""].filter(Boolean).join(" ")}
>
    {#if data.hasFieldset}
        <Fieldset aria-describedby={data.fieldsetDescribedBy}>
            {#if data.legend !== undefined}
                <FieldsetLegend class={data.legendClasses ?? ""}>
                    {#if data.legendPageHeading}<h1 class="govuk-fieldset__heading">{data.legend}</h1>{:else}{data.legend}{/if}
                </FieldsetLegend>
            {/if}
            {#if data.hintId}<Hint id={data.hintId}>{data.hint}</Hint>{/if}
            {#if data.errorId}<ErrorMessage id={data.errorId}>{data.error}</ErrorMessage>{/if}
            {@render radios()}
        </Fieldset>
    {:else}
        {#if data.hintId}<Hint id={data.hintId}>{data.hint}</Hint>{/if}
        {#if data.errorId}<ErrorMessage id={data.errorId}>{data.error}</ErrorMessage>{/if}
        {@render radios()}
    {/if}
</FormGroup>
