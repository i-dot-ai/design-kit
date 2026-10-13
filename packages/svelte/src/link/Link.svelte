<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAnchorAttributes } from "svelte/elements";

    type Props = HTMLAnchorAttributes & {
        noUnderline?: boolean;
        noVisitedState?: boolean;
        variant?: "warning" | "inverse";
        class?: string;
        children?: Snippet;
    };

    let { noUnderline = false, noVisitedState = false, variant, class: className = "", children, ...rest }: Props = $props();

    let classes = $derived(
        [
            "govuk-link",
            noUnderline ? "govuk-link--no-underline" : "",
            noVisitedState ? "govuk-link--no-visited-state" : "",
            (variant ? { "warning": "govuk-link--warning", "inverse": "govuk-link--inverse" }[variant] : ""),
            className,
        ]
            .filter(Boolean)
            .join(" "),
    );
</script>

<a class={classes} {...rest}>
    {@render children?.()}
</a>
