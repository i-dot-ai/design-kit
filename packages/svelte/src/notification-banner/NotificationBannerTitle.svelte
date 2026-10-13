<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLHeadingElement> & {
        class?: string;
        children?: Snippet;
    };

    let { class: className = "", children, ...rest }: Props = $props();

    let classes = $derived(["govuk-notification-banner__title", className].filter(Boolean).join(" "));
</script>

<h2 class={classes} id="govuk-notification-banner-title" {...rest}>
    {@render children?.()}
</h2>
