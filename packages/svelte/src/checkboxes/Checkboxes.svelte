<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement> & {
        small?: boolean;
        subtle?: boolean;
        class?: string;
        children?: Snippet;
    };

    let { small = false, subtle = false, class: className = "", children, ...rest }: Props = $props();

    let classes = $derived(
        [
            "govuk-checkboxes",
            small ? "govuk-checkboxes--small" : "",
            subtle ? "govuk-checkboxes--subtle" : "",
            className,
        ]
            .filter(Boolean)
            .join(" "),
    );
</script>

<div class={classes} data-module="govuk-checkboxes" {...rest}>
    {@render children?.()}
</div>
