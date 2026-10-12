<script lang="ts">
    import type { HTMLInputAttributes } from "svelte/elements";

    type Props = HTMLInputAttributes & {
        class?: string;
    };

    let { class: className = "", ...rest }: Props = $props();

    let classes = $derived(
        ["govuk-checkboxes__input", className].filter(Boolean).join(" "),
    );
</script>

<input class={classes} type="checkbox" {...rest} />
