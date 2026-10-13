<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement> & {
        class?: string;
        children?: Snippet;
    };

    let { class: className = "", children, ...rest }: Props = $props();

    let classes = $derived(
        [
            "govuk-panel",
            className.includes("govuk-panel--interruption") ? "" : "govuk-panel--confirmation",
            className,
        ]
            .filter(Boolean)
            .join(" "),
    );
</script>

<div class={classes} {...rest}>
    {@render children?.()}
</div>
