<script>
    import { ServiceNavigation, ServiceNavigationItem } from "@i-dot-ai-npm/component-library-svelte";

    let { classes, serviceName, serviceUrl, hasNavigation, collapseNavigationOnMobile, endSlotHtml, endSlotInline, items } = $props();
</script>

{#snippet end()}
    {@html endSlotHtml}
{/snippet}

<ServiceNavigation
    class={classes}
    {serviceName}
    {serviceUrl}
    {hasNavigation}
    {collapseNavigationOnMobile}
    endSlot={endSlotHtml !== undefined ? end : undefined}
    {endSlotInline}
>
    {#each items as item}
        <ServiceNavigationItem href={item.href} current={item.current} active={item.active}>
            {#if item.html !== undefined}{@html item.html}{:else}{item.text}{/if}
        </ServiceNavigationItem>
    {/each}
</ServiceNavigation>
