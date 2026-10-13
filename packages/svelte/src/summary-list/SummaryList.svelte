<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDListElement> & {
        noBorder?: boolean;
        class?: string;
        children?: Snippet;
    };

    let { noBorder = false, class: className = "", children, ...rest }: Props = $props();

    let classes = $derived(
        [
            "govuk-summary-list",
            noBorder ? "govuk-summary-list--no-border" : "",
            className,
        ]
            .filter(Boolean)
            .join(" "),
    );
</script>

<dl class={classes} {...rest}>
    {@render children?.()}
</dl>
