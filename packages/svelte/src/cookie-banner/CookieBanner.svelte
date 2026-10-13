<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement> & {
        class?: string;
        children?: Snippet;
    };

    let { class: className = "", children, ...rest }: Props = $props();

    let classes = $derived(["govuk-cookie-banner", className].filter(Boolean).join(" "));
</script>

<div class={classes} data-nosnippet="" role="region" aria-label="Cookie banner" {...rest}>
    {@render children?.()}
</div>
