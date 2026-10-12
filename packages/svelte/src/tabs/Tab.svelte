<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAnchorAttributes } from "svelte/elements";

    type Props = HTMLAnchorAttributes & {
        selected?: boolean;
        class?: string;
        children?: Snippet;
    };

    let { selected = false, class: className = "", children, ...rest }: Props = $props();

    let classes = $derived(["govuk-tabs__tab", className].filter(Boolean).join(" "));
</script>

<li class={["govuk-tabs__list-item", selected ? "govuk-tabs__list-item--selected" : ""].filter(Boolean).join(" ")}>
    <a class={classes} {...rest}>
        {@render children?.()}
    </a>
</li>
