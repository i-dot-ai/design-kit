<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLLiAttributes } from "svelte/elements";

    type Props = HTMLLiAttributes & {
        withLink?: boolean;
        class?: string;
        children?: Snippet;
    };

    let { withLink = false, class: className = "", children, ...rest }: Props = $props();

    let classes = $derived(
        [
            "govuk-task-list__item",
            withLink ? "govuk-task-list__item--with-link" : "",
            className,
        ]
            .filter(Boolean)
            .join(" "),
    );
</script>

<li class={classes} {...rest}>
    {@render children?.()}
</li>
