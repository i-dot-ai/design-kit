<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement> & {
        class?: string;
        children?: Snippet;
    };

    let { class: className = "", children, ...rest }: Props = $props();

    let classes = $derived(["govuk-error-summary", className].filter(Boolean).join(" "));
</script>

<div class={classes} data-module="govuk-error-summary" {...rest}>
    <div role="alert">
        {@render children?.()}
    </div>
</div>
