<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAnchorAttributes, HTMLAttributes } from "svelte/elements";

    type Props = HTMLAnchorAttributes & HTMLAttributes<HTMLSpanElement> & {
        href?: string;
        /** Current page — adds active styling + aria-current="page". */
        current?: boolean;
        /** Active section — adds active styling + aria-current="true". */
        active?: boolean;
        class?: string;
        children?: Snippet;
    };

    let { href, current = false, active = false, class: className = "", children, ...rest }: Props = $props();

    let isActive = $derived(current || active);
    let classes = $derived(
        [
            "govuk-service-navigation__item",
            isActive ? "govuk-service-navigation__item--active" : "",
            className,
        ]
            .filter(Boolean)
            .join(" "),
    );
    let ariaCurrent = $derived(current ? ("page" as const) : active ? ("true" as const) : undefined);
</script>

<li class={classes}>
    {#if href !== undefined}
        <a class="govuk-service-navigation__link" {href} aria-current={ariaCurrent} {...rest}>
            {#if isActive}<strong class="govuk-service-navigation__active-fallback">{@render children?.()}</strong>{:else}{@render children?.()}{/if}
        </a>
    {:else}
        <span class="govuk-service-navigation__text" aria-current={ariaCurrent} {...rest}>
            {#if isActive}<strong class="govuk-service-navigation__active-fallback">{@render children?.()}</strong>{:else}{@render children?.()}{/if}
        </span>
    {/if}
</li>
