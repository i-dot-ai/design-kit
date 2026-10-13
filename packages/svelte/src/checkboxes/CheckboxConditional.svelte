<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement> & {
        hidden?: boolean;
        class?: string;
        children?: Snippet;
    };

    let { hidden = true, class: className = "", children, ...rest }: Props = $props();

    let classes = $derived(
        [
            "govuk-checkboxes__conditional",
            hidden ? "govuk-checkboxes__conditional--hidden" : "",
            className,
        ]
            .filter(Boolean)
            .join(" "),
    );
</script>

<div class={classes} {...rest}>
    {@render children?.()}
</div>
