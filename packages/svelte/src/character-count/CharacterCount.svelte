<script lang="ts">
    import type { HTMLTextareaAttributes } from "svelte/elements";

    type Props = HTMLTextareaAttributes & {
        class?: string;
    };

    let { class: className = "", value, ...rest }: Props = $props();

    let classes = $derived(
        ["govuk-textarea govuk-js-character-count", className]
            .filter(Boolean)
            .join(" "),
    );
</script>

<textarea class={classes} {...rest}>{value ?? ""}</textarea>
