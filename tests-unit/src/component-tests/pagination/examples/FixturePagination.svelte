<script>
    import {
        Pagination,
        PaginationPrev,
        PaginationNext,
        PaginationList,
        PaginationItem,
    } from "@i-dot-ai-npm/component-library-svelte";

    let { block, previous, next, items } = $props();
</script>

<Pagination {block}>
    {#if previous}
        {#if previous.text}
            <PaginationPrev href={previous.href} {block} labelText={previous.labelText}>{previous.text}</PaginationPrev>
        {:else}
            <PaginationPrev href={previous.href} {block} labelText={previous.labelText} />
        {/if}
    {/if}
    {#if items.length > 0}
        <PaginationList>
            {#each items as item}
                {#if item.ellipsis}
                    <PaginationItem ellipsis />
                {:else}
                    <PaginationItem href={item.href} current={item.current} ariaLabel={`Page ${item.number}`}>{item.number}</PaginationItem>
                {/if}
            {/each}
        </PaginationList>
    {/if}
    {#if next}
        {#if next.text}
            <PaginationNext href={next.href} {block} labelText={next.labelText}>{next.text}</PaginationNext>
        {:else}
            <PaginationNext href={next.href} {block} labelText={next.labelText} />
        {/if}
    {/if}
</Pagination>
