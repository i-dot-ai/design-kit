<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement> & {
        class?: string;
        children?: Snippet;
    };

    let { class: className = "", children, ...rest }: Props = $props();

    let classes = $derived(["govuk-warning-text", className].filter(Boolean).join(" "));
</script>

<div class={classes} {...rest}>
    <span class="govuk-warning-text__icon" aria-hidden="true">
        !
    </span>
    <strong class="govuk-warning-text__text">
        <span class="govuk-visually-hidden">
            Warning
        </span>
        {@render children?.()}
    </strong>
</div>
