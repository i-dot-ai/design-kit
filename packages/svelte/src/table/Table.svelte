<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLTableAttributes } from "svelte/elements";

    type Props = Omit<HTMLTableAttributes, "summary"> & {
        smallTextUntilTablet?: boolean;
        subtle?: boolean;
        summary?: boolean;
        class?: string;
        children?: Snippet;
    };

    let { smallTextUntilTablet = false, subtle = false, summary = false, class: className = "", children, ...rest }: Props = $props();

    let classes = $derived(
        [
            "govuk-table",
            smallTextUntilTablet ? "govuk-table--small-text-until-tablet" : "",
            subtle ? "govuk-table--subtle" : "",
            summary ? "govuk-table--summary" : "",
            className,
        ]
            .filter(Boolean)
            .join(" "),
    );
</script>

<table class={classes} {...rest}>
    {@render children?.()}
</table>
