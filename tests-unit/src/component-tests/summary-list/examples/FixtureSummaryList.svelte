<script>
    import {
        SummaryList,
        SummaryListRow,
        SummaryListKey,
        SummaryListValue,
        SummaryListActions,
        SummaryCard,
        SummaryCardTitleWrapper,
        SummaryCardTitle,
        SummaryCardActions,
        SummaryCardAction,
        SummaryCardContent,
    } from "@i-dot-ai-npm/component-library-svelte";
    import { hiddenSuffix } from "../match-govuk-mappings.js";

    let { noBorder, rows, card } = $props();

    let cardTitle = $derived(card?.titleText);
</script>

{#snippet actionLink(action)}
    <a class="govuk-link" href={action.href}>{action.text}{#if hiddenSuffix(action.visuallyHiddenText, cardTitle)}<span class="govuk-visually-hidden">{hiddenSuffix(action.visuallyHiddenText, cardTitle)}</span>{/if}</a>
{/snippet}

{#snippet list()}
    <SummaryList {noBorder}>
        {#each rows as row}
            <SummaryListRow class={row.rowClass}>
                <SummaryListKey>{row.keyText}</SummaryListKey>
                <SummaryListValue>
                    {#if row.valueHtml}{@html row.valueHtml}{:else}{row.valueText}{/if}
                </SummaryListValue>
                {#if row.actions.length > 0}
                    <SummaryListActions>
                        {#if row.actions.length === 1}
                            {@render actionLink(row.actions[0])}
                        {:else}
                            <ul class="govuk-summary-list__actions-list">
                                {#each row.actions as action}
                                    <li class="govuk-summary-list__actions-list-item">{@render actionLink(action)}</li>
                                {/each}
                            </ul>
                        {/if}
                    </SummaryListActions>
                {/if}
            </SummaryListRow>
        {/each}
    </SummaryList>
{/snippet}

{#if card}
    <SummaryCard>
        <SummaryCardTitleWrapper>
            <SummaryCardTitle>{#if card.titleHtml}{@html card.titleHtml}{:else}{card.titleText}{/if}</SummaryCardTitle>
            {#if card.actions.length === 1}
                <SummaryCardActions single>{@render actionLink(card.actions[0])}</SummaryCardActions>
            {:else if card.actions.length > 1}
                <SummaryCardActions>
                    {#each card.actions as action}
                        <SummaryCardAction>{@render actionLink(action)}</SummaryCardAction>
                    {/each}
                </SummaryCardActions>
            {/if}
        </SummaryCardTitleWrapper>
        <SummaryCardContent>
            {@render list()}
        </SummaryCardContent>
    </SummaryCard>
{:else}
    {@render list()}
{/if}
