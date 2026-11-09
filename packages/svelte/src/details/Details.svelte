<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLDetailsAttributes } from "svelte/elements";

    type Props = HTMLDetailsAttributes & {
        class?: string;
        children?: Snippet;
    };

    let { class: className = "", children, ...rest }: Props = $props();

    let classes = $derived(["govuk-details", className].filter(Boolean).join(" "));
</script>

<details class={classes} {...rest}>
    {@render children?.()}
</details>
