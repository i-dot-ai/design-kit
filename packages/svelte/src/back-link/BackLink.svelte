<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAnchorAttributes } from "svelte/elements";

    type Props = HTMLAnchorAttributes & {
        inverse?: boolean;
        class?: string;
        children?: Snippet;
    };

    let { inverse = false, class: className = "", children, ...rest }: Props = $props();

    let classes = $derived(
        [
            "govuk-back-link",
            inverse ? "govuk-back-link--inverse" : "",
            className,
        ]
            .filter(Boolean)
            .join(" "),
    );
</script>

<a class={classes} {...rest}>
    {@render children?.()}
</a>
