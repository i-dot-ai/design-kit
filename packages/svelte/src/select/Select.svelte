<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLSelectAttributes } from "svelte/elements";

    type Props = HTMLSelectAttributes & {
        subtle?: boolean;
        error?: boolean;
        class?: string;
        children?: Snippet;
    };

    let { subtle = false, error = false, class: className = "", children, ...rest }: Props = $props();

    let classes = $derived(
        [
            "govuk-select",
            subtle ? "govuk-select--subtle" : "",
            error ? "govuk-select--error" : "",
            className,
        ]
            .filter(Boolean)
            .join(" "),
    );
</script>

<select class={classes} {...rest}>
    {@render children?.()}
</select>
