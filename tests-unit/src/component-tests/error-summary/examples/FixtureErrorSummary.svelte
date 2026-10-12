<script>
    import {
        ErrorSummary,
        ErrorSummaryTitle,
        ErrorSummaryBody,
        ErrorSummaryList,
        ErrorSummaryItem,
    } from "@i-dot-ai-npm/component-library-svelte";

    let { titleText, descriptionText, errorList } = $props();
</script>

<ErrorSummary>
    <ErrorSummaryTitle>{titleText}</ErrorSummaryTitle>
    <ErrorSummaryBody>
        {#if descriptionText !== undefined}
            <p>{descriptionText}</p>
        {/if}
        {#if errorList.length > 0}
            <ErrorSummaryList>
                {#each errorList as item}
                    <ErrorSummaryItem href={item.href}>{item.text}</ErrorSummaryItem>
                {/each}
            </ErrorSummaryList>
        {/if}
    </ErrorSummaryBody>
</ErrorSummary>
