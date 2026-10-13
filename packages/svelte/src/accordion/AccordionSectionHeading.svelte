<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLSpanElement> & {
        class?: string;
        children?: Snippet;
    };

    let { class: className = "", children, ...rest }: Props = $props();

    let classes = $derived(["govuk-accordion__section-button", className].filter(Boolean).join(" "));
</script>

<h2 class="govuk-accordion__section-heading">
    <span class={classes} {...rest}>
        {@render children?.()}
    </span>
</h2>
