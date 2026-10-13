<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLLegendElement> & {
        size?: "small" | "medium" | "large" | "xl";
        isPageHeading?: boolean;
        class?: string;
        children?: Snippet;
    };

    let { size, isPageHeading, class: className = "", children, ...rest }: Props = $props();

    let classes = $derived(
        [
            "govuk-fieldset__legend",
            (size ? { "small": "govuk-fieldset__legend--s", "medium": "govuk-fieldset__legend--m", "large": "govuk-fieldset__legend--l", "xl": "govuk-fieldset__legend--xl" }[size] : ""),
            className,
        ]
            .filter(Boolean)
            .join(" "),
    );
</script>

<legend class={classes} {...rest}>
    {#if isPageHeading}
        <h1 class="govuk-fieldset__heading">
            {@render children?.()}
        </h1>
    {:else}
        {@render children?.()}
    {/if}
</legend>
