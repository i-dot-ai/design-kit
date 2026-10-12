<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLFieldsetAttributes } from "svelte/elements";

    type Props = HTMLFieldsetAttributes & {
        class?: string;
        children?: Snippet;
    };

    let { class: className = "", children, ...rest }: Props = $props();

    let classes = $derived(["govuk-fieldset", className].filter(Boolean).join(" "));
</script>

<fieldset class={classes} {...rest}>
    {@render children?.()}
</fieldset>
