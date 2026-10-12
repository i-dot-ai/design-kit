<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement> & {
        noActions?: boolean;
        class?: string;
        children?: Snippet;
    };

    let { noActions = false, class: className = "", children, ...rest }: Props = $props();

    let classes = $derived(
        [
            "govuk-summary-list__row",
            noActions ? "govuk-summary-list__row--no-actions" : "",
            className,
        ]
            .filter(Boolean)
            .join(" "),
    );
</script>

<div class={classes} {...rest}>
    {@render children?.()}
</div>
