<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLThAttributes } from "svelte/elements";

    type Props = HTMLThAttributes & {
        numeric?: boolean;
        scope?: "col" | "row" | "colgroup" | "rowgroup";
        class?: string;
        children?: Snippet;
    };

    let { numeric = false, scope = "col", class: className = "", children, ...rest }: Props = $props();

    let classes = $derived(
        [
            "govuk-table__header",
            numeric ? "govuk-table__header--numeric" : "",
            className,
        ]
            .filter(Boolean)
            .join(" "),
    );
</script>

<th class={classes} {scope} {...rest}>
    {@render children?.()}
</th>
