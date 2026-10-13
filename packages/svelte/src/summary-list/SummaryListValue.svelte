<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLElement> & {
        class?: string;
        children?: Snippet;
    };

    let { class: className = "", children, ...rest }: Props = $props();

    let classes = $derived(["govuk-summary-list__value", className].filter(Boolean).join(" "));
</script>

<dd class={classes} {...rest}>
    {@render children?.()}
</dd>
