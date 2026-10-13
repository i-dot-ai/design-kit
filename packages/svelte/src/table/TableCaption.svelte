<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLElement> & {
        size?: "small" | "medium" | "large" | "xl";
        class?: string;
        children?: Snippet;
    };

    let { size, class: className = "", children, ...rest }: Props = $props();

    let classes = $derived(
        [
            "govuk-table__caption",
            (size ? { "small": "govuk-table__caption--s", "medium": "govuk-table__caption--m", "large": "govuk-table__caption--l", "xl": "govuk-table__caption--xl" }[size] : ""),
            className,
        ]
            .filter(Boolean)
            .join(" "),
    );
</script>

<caption class={classes} {...rest}>
    {@render children?.()}
</caption>
