<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAnchorAttributes } from "svelte/elements";

    type Props = HTMLAnchorAttributes & {
        href?: string;
        class?: string;
        children?: Snippet;
    };

    let { href, class: className, children, ...rest }: Props = $props();
</script>

<li>
    {#if href !== undefined}
        <a {href} class={className} {...rest}>{@render children?.()}</a>
    {:else}
        {@render children?.()}
    {/if}
</li>
