<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLLabelAttributes } from "svelte/elements";

    type Props = HTMLLabelAttributes & {
        size?: "small" | "medium" | "large" | "xl";
        isPageHeading?: boolean;
        class?: string;
        children?: Snippet;
    };

    let { size, isPageHeading = false, class: className = "", children, ...rest }: Props = $props();

    let classes = $derived(
        [
            "govuk-label",
            (size ? { "small": "govuk-label--s", "medium": "govuk-label--m", "large": "govuk-label--l", "xl": "govuk-label--xl" }[size] : ""),
            className,
        ]
            .filter(Boolean)
            .join(" "),
    );
</script>

{#snippet label()}
    <label class={classes} {...rest}>
        {@render children?.()}
    </label>
{/snippet}

{#if isPageHeading}
    <h1 class="govuk-label-wrapper">
        {@render label()}
    </h1>
{:else}
    {@render label()}
{/if}
