<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLTableRowElement> & {
        class?: string;
        children?: Snippet;
    };

    let { class: className = "", children, ...rest }: Props = $props();

    let classes = $derived(["govuk-table__row", className].filter(Boolean).join(" "));
</script>

<tr class={classes} {...rest}>
    {@render children?.()}
</tr>
