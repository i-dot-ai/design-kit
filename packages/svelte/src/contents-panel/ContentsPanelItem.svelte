<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLLiAttributes } from "svelte/elements";

    type Props = HTMLLiAttributes & {
        href?: string;
        current?: boolean;
        class?: string;
        children?: Snippet;
    };

    let { href, current = false, class: className = "", children, ...rest }: Props = $props();

    let itemClasses = $derived(
        [
            "contents-panel__list-item",
            current ? "contents-panel__list-item--current" : "",
            className,
        ]
            .filter(Boolean)
            .join(" "),
    );
</script>

<li class={itemClasses} {...rest}>
    <a
        class="contents-panel__link govuk-link govuk-link--no-visited-state govuk-link--no-underline"
        {href}
        aria-current={current ? "page" : undefined}
    >
        {@render children?.()}
    </a>
</li>
