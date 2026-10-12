<script>
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
    } from "@i-dot-ai-npm/component-library-svelte";

    let { data } = $props();
</script>

{#snippet items()}
    {#each data.items as item, i (item.divider ? `divider-${i}` : item.id)}
        {#if item.divider !== undefined}
            <CheckboxDivider>{item.divider}</CheckboxDivider>
        {:else}
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
                <CheckboxLabel for={item.id}>
                    {#if item.html}{@html item.html}{:else}{item.text}{/if}
                </CheckboxLabel>
                {#if item.hintId}
                    <Hint id={item.hintId} class="govuk-checkboxes__hint">{item.hintText}</Hint>
                {/if}
            </CheckboxItem>
            {#if item.conditionalId}
                <CheckboxConditional id={item.conditionalId} hidden={item.conditionalHidden}>{@html item.conditionalHtml}</CheckboxConditional>
            {/if}
        {/if}
    {/each}
{/snippet}

{#snippet checkboxes()}
    <Checkboxes
        class={data.checkboxesClasses ?? ""}
        aria-describedby={!data.hasFieldset ? data.fieldsetDescribedBy : undefined}
    >
        {@render items()}
    </Checkboxes>
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
            {@render checkboxes()}
        </Fieldset>
    {:else}
        {#if data.hintId}<Hint id={data.hintId}>{data.hint}</Hint>{/if}
        {#if data.errorId}<ErrorMessage id={data.errorId}>{data.error}</ErrorMessage>{/if}
        {@render checkboxes()}
    {/if}
</FormGroup>
