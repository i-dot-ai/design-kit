<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLElement> & {
        heading?: string;
        headingId?: string;
        class?: string;
        children?: Snippet;
    };

    let {
        heading = "Pages in this section",
        headingId = "contents-panel-heading",
        class: className = "",
        children,
        ...rest
    }: Props = $props();

    let classes = $derived(
        ["contents-panel", className].filter(Boolean).join(" "),
    );
</script>

<nav class={classes} aria-labelledby={headingId} {...rest}>
    <h2 class="govuk-visually-hidden" id={headingId}>{heading}</h2>
    {@render children?.()}
</nav>
