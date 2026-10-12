<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement> & {
        hidden?: boolean;
        class?: string;
        children?: Snippet;
    };

    let { hidden = false, class: className = "", children, ...rest }: Props = $props();

    let classes = $derived(
        [
            "govuk-tabs__panel",
            hidden ? "govuk-tabs__panel--hidden" : "",
            className,
        ]
            .filter(Boolean)
            .join(" "),
    );
</script>

<div class={classes} {...rest}>
    {@render children?.()}
</div>
