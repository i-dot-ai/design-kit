<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAnchorAttributes } from "svelte/elements";

    type Props = HTMLAnchorAttributes & {
        current?: boolean;
        ellipsis?: boolean;
        /** aria-label for the page link (e.g. "Page 2"). */
        ariaLabel?: string;
        class?: string;
        children?: Snippet;
    };

    let { current = false, ellipsis = false, ariaLabel, class: className = "", children, ...rest }: Props = $props();
</script>

{#if ellipsis}
<li class="govuk-pagination__item govuk-pagination__item--ellipsis">
    {#if children}{@render children()}{:else}⋯{/if}
</li>
{:else}
<li class={["govuk-pagination__item", current ? "govuk-pagination__item--current" : ""].filter(Boolean).join(" ")}>
    <a class={["govuk-link govuk-pagination__link", className].filter(Boolean).join(" ")} aria-label={ariaLabel} aria-current={current ? "page" : undefined} {...rest}>
        {@render children?.()}
    </a>
</li>
{/if}
