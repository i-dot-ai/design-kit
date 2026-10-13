<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLLiAttributes } from "svelte/elements";

    type Props = HTMLLiAttributes & {
        class?: string;
        children?: Snippet;
    };

    let { class: className = "", children, ...rest }: Props = $props();

    let classes = $derived(["govuk-summary-card__action", className].filter(Boolean).join(" "));
</script>

<li class={classes} {...rest}>
    {@render children?.()}
</li>
