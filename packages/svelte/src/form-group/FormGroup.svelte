<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement> & {
        inline?: boolean;
        class?: string;
        children?: Snippet;
    };

    let { inline = false, class: className = "", children, ...rest }: Props = $props();

    let classes = $derived(
        [
            "govuk-form-group",
            inline ? "govuk-form-group--inline" : "",
            className,
        ]
            .filter(Boolean)
            .join(" "),
    );
</script>

<div class={classes} {...rest}>
    {@render children?.()}
</div>
