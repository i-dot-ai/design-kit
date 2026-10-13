<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLLiAttributes } from "svelte/elements";

    type Props = HTMLLiAttributes & {
        href?: string;
        class?: string;
        children?: Snippet;
    };

    let { href, class: className = "", children, ...rest }: Props = $props();

    let classes = $derived(["govuk-breadcrumbs__list-item", className].filter(Boolean).join(" "));
</script>

{#if href === undefined}
    <li class={classes} aria-current="page" {...rest}>
        {@render children?.()}
    </li>
{:else}
    <li class={classes} {...rest}>
        <a class="govuk-breadcrumbs__link" href={href}>
            {@render children?.()}
        </a>
    </li>
{/if}
