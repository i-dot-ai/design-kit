<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLElement> & {
        block?: boolean;
        class?: string;
        children?: Snippet;
    };

    let { block = false, class: className = "", children, ...rest }: Props = $props();

    let classes = $derived(
        [
            "govuk-pagination",
            block ? "govuk-pagination--block" : "",
            className,
        ]
            .filter(Boolean)
            .join(" "),
    );
</script>

<nav class={classes} aria-label="Pagination" {...rest}>
    {@render children?.()}
</nav>
