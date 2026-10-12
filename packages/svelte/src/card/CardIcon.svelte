<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement> & {
        class?: string;
        children?: Snippet;
    };

    let { class: className = "", children, ...rest }: Props = $props();

    let classes = $derived(["iai-card__icon", className].filter(Boolean).join(" "));
</script>

<div class={classes} aria-hidden="true" {...rest}>
    {@render children?.()}
</div>
