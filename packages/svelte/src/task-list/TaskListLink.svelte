<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAnchorAttributes } from "svelte/elements";

    type Props = HTMLAnchorAttributes & {
        class?: string;
        children?: Snippet;
    };

    let { class: className = "", children, ...rest }: Props = $props();

    let classes = $derived(["govuk-link govuk-task-list__link", className].filter(Boolean).join(" "));
</script>

<a class={classes} {...rest}>
    {@render children?.()}
</a>
