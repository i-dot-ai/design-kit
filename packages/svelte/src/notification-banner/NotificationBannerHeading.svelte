<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLParagraphElement> & {
        class?: string;
        children?: Snippet;
    };

    let { class: className = "", children, ...rest }: Props = $props();

    let classes = $derived(["govuk-notification-banner__heading", className].filter(Boolean).join(" "));
</script>

<p class={classes} {...rest}>
    {@render children?.()}
</p>
