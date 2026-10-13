<script lang="ts">
    import type { HTMLTextareaAttributes } from "svelte/elements";

    type Props = HTMLTextareaAttributes & {
        error?: boolean;
        subtle?: boolean;
        value?: string;
        class?: string;
    };

    let {
        error = false,
        subtle = false,
        value = "",
        class: className = "",
        ...rest
    }: Props = $props();

    let classes = $derived(
        [
            "govuk-textarea",
            error ? "govuk-textarea--error" : "",
            subtle ? "govuk-textarea--subtle" : "",
            className,
        ]
            .filter(Boolean)
            .join(" "),
    );
</script>

<textarea class={classes} {...rest}>{value}</textarea>
