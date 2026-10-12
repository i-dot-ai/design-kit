<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement> & {
        secondary?: boolean;
        class?: string;
        children?: Snippet;
    };

    let { secondary = false, class: className = "", children, ...rest }: Props = $props();

    let classes = $derived(
        [
            "iai-card",
            secondary ? "iai-card--secondary" : "",
            className,
        ]
            .filter(Boolean)
            .join(" "),
    );
</script>

<div class={classes} {...rest}>
    {@render children?.()}
</div>
