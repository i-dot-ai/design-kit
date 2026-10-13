<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement> & {
        class?: string;
        children?: Snippet;
    };

    let { class: className = "", children, ...rest }: Props = $props();

    let classes = $derived(["govuk-phase-banner govuk-width-container", className].filter(Boolean).join(" "));
</script>

<div class={classes} {...rest}>
    <p class="govuk-phase-banner__content">
        {@render children?.()}
    </p>
</div>
