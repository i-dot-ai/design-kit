<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLElement> & {
        class?: string;
        children?: Snippet;
    };

    let { class: className = "", children, ...rest }: Props = $props();

    let classes = $derived(["govuk-details__summary", className].filter(Boolean).join(" "));
</script>

<summary class={classes} {...rest}>
    <span class="govuk-details__summary-text">
        {@render children?.()}
    </span>
</summary>
