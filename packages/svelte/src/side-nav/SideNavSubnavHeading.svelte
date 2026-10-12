<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLHeadingElement> & {
        class?: string;
        children?: Snippet;
    };

    let { class: className = "", children, ...rest }: Props = $props();

    let classes = $derived(["side-nav__section-heading", className].filter(Boolean).join(" "));
</script>

<h3 class={classes} {...rest}>
    {@render children?.()}
</h3>
