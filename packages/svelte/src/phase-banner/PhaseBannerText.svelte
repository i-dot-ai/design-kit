<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLSpanElement> & {
        class?: string;
        children?: Snippet;
    };

    let { class: className = "", children, ...rest }: Props = $props();

    let classes = $derived(["govuk-phase-banner__text", className].filter(Boolean).join(" "));
</script>

<span class={classes} {...rest}>
    {@render children?.()}
</span>
