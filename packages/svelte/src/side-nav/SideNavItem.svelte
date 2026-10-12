<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLLiAttributes } from "svelte/elements";

    type Props = HTMLLiAttributes & {
        href?: string;
        class?: string;
        children?: Snippet;
    };

    let { href, class: className = "", children, ...rest }: Props = $props();

    let classes = $derived(["side-nav__item", className].filter(Boolean).join(" "));
</script>

<li class={classes} {...rest}>
    <a class="govuk-link govuk-link--no-visited-state govuk-!-font-size-16 govuk-link--no-underline" href={href}>
        {@render children?.()}
    </a>
</li>
