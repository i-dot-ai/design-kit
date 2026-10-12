<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAnchorAttributes } from "svelte/elements";

    type Props = HTMLAnchorAttributes & {
        /** Block-level layout (no numbered items, just prev/next). */
        block?: boolean;
        /** Descriptive label shown alongside the title (block layout only). */
        labelText?: string;
        class?: string;
        children?: Snippet;
    };

    let { block = false, labelText, class: className = "", children, ...rest }: Props = $props();

    let classes = $derived(["govuk-link govuk-pagination__link", className].filter(Boolean).join(" "));
    let titleClasses = $derived(
        [
            "govuk-pagination__link-title",
            block && !labelText ? "govuk-pagination__link-title--decorated" : "",
        ]
            .filter(Boolean)
            .join(" "),
    );
</script>

<div class="govuk-pagination__next">
    <a class={classes} rel="next" {...rest}>
        {#if block}
            <svg class="govuk-pagination__icon govuk-pagination__icon--next" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
                <path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"></path>
            </svg>
        {/if}
        <span class={titleClasses}>
            {#if children}{@render children()}{:else}Next<span class="govuk-visually-hidden"> page</span>{/if}
        </span>
        {#if labelText && block}
            <span class="govuk-visually-hidden">:</span>
            <span class="govuk-pagination__link-label">{labelText}</span>
        {/if}
        {#if !block}
            <svg class="govuk-pagination__icon govuk-pagination__icon--next" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
                <path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"></path>
            </svg>
        {/if}
    </a>
</div>
