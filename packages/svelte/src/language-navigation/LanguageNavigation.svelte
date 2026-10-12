<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLElement> & {
        ariaLabel?: string;
        class?: string;
        children?: Snippet;
    };

    let { ariaLabel = "Language", class: className = "", children, ...rest }: Props = $props();

    let classes = $derived(
        ["govuk-language-navigation", className].filter(Boolean).join(" "),
    );
</script>

<nav class={classes} aria-label={ariaLabel} {...rest}>
    <ul class="govuk-language-navigation__list">
        {@render children?.()}
    </ul>
</nav>
