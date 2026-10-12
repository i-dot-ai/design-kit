<script>
    import { Details, DetailsSummary, DetailsText } from "@i-dot-ai-npm/component-library-svelte";

    let { id, open, summaryText, summaryHtml, text, html } = $props();

    let rest = $derived({ ...(id ? { id } : {}), ...(open ? { open: true } : {}) });
</script>

<Details {...rest}>
    <DetailsSummary>
        {#if summaryHtml}{@html summaryHtml}{:else}{summaryText}{/if}
    </DetailsSummary>
    <DetailsText>
        {#if html}{@html html}{:else}{text}{/if}
    </DetailsText>
</Details>
