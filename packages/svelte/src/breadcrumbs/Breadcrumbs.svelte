<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLElement> & {
        inverse?: boolean;
        collapseOnMobile?: boolean;
        class?: string;
        children?: Snippet;
    };

    let { inverse = false, collapseOnMobile = false, class: className = "", children, ...rest }: Props = $props();

    let classes = $derived(
        [
            "govuk-breadcrumbs",
            inverse ? "govuk-breadcrumbs--inverse" : "",
            collapseOnMobile ? "govuk-breadcrumbs--collapse-on-mobile" : "",
            className,
        ]
            .filter(Boolean)
            .join(" "),
    );
</script>

<nav class={classes} aria-label="Breadcrumb" {...rest}>
    <ol class="govuk-breadcrumbs__list">
        {@render children?.()}
    </ol>
</nav>
