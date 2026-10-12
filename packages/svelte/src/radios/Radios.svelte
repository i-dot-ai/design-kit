<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement> & {
        inline?: boolean;
        small?: boolean;
        class?: string;
        children?: Snippet;
    };

    let { inline = false, small = false, class: className = "", children, ...rest }: Props = $props();

    let classes = $derived(
        [
            "govuk-radios",
            inline ? "govuk-radios--inline" : "",
            small ? "govuk-radios--small" : "",
            className,
        ]
            .filter(Boolean)
            .join(" "),
    );
</script>

<div class={classes} data-module="govuk-radios" {...rest}>
    {@render children?.()}
</div>
