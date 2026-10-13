<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement> & {
        href?: string;
        class?: string;
        containerClasses?: string;
        children?: Snippet;
    };

    let { href, class: className = "", containerClasses = "", children, ...rest }: Props = $props();

    let classes = $derived(["govuk-generic-header", className].filter(Boolean).join(" "));
    let container = $derived(["govuk-generic-header__container", containerClasses || "govuk-width-container"].join(" "));
</script>

<div class={classes} {...rest}>
    <div class={container}>
        <div class="govuk-generic-header__logo">
            <a class="govuk-generic-header__homepage-link" href={href}>
                {@render children?.()}
            </a>
        </div>
    </div>
</div>
