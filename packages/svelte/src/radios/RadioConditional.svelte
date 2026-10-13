<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement> & {
        hidden?: boolean;
        class?: string;
        children?: Snippet;
    };

    let { hidden = true, class: className = "", children, ...rest }: Props = $props();

    let classes = $derived(
        [
            "govuk-radios__conditional",
            hidden ? "govuk-radios__conditional--hidden" : "",
            className,
        ]
            .filter(Boolean)
            .join(" "),
    );
</script>

<div class={classes} {...rest}>
    {@render children?.()}
</div>
