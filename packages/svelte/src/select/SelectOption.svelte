<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLOptionAttributes } from "svelte/elements";

    type Props = HTMLOptionAttributes & {
        class?: string;
        children?: Snippet;
    };

    let { class: className = "", children, ...rest }: Props = $props();

    let classes = $derived(["", className].filter(Boolean).join(" "));
</script>

<option class={classes} {...rest}>
    {@render children?.()}
</option>
