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

<div class="govuk-pagination__prev">
    <a class={classes} rel="prev" {...rest}>
        <svg class="govuk-pagination__icon govuk-pagination__icon--prev" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
            <path d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z"></path>
        </svg>
        <span class={titleClasses}>
            {#if children}{@render children()}{:else}Previous<span class="govuk-visually-hidden"> page</span>{/if}
        </span>
        {#if labelText && block}
            <span class="govuk-visually-hidden">:</span>
            <span class="govuk-pagination__link-label">{labelText}</span>
        {/if}
    </a>
</div>
