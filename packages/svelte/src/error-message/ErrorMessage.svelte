<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLParagraphElement> & {
        visuallyHiddenText?: string;
        class?: string;
        children?: Snippet;
    };

    let { visuallyHiddenText = "Error", class: className = "", children, ...rest }: Props = $props();

    let classes = $derived(["govuk-error-message", className].filter(Boolean).join(" "));
</script>

<p class={classes} {...rest}>
    {#if visuallyHiddenText}<span class="govuk-visually-hidden">{visuallyHiddenText}:</span>{/if}
    {@render children?.()}
</p>
