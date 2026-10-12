<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLElement> & {
        class?: string;
        children?: Snippet;
    };

    let { class: className = "", children, ...rest }: Props = $props();

    let classes = $derived(["side-nav", className].filter(Boolean).join(" "));
</script>

<nav class={classes} {...rest}>
    {@render children?.()}
</nav>
