<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement> & {
        title?: string;
        class?: string;
        children?: Snippet;
    };

    let { title, class: className = "", children, ...rest }: Props = $props();

    let classes = $derived(
        ["govuk-feedback govuk-width-container", className].filter(Boolean).join(" "),
    );
</script>

<div class={classes} {...rest}>
    <div class="govuk-grid-row">
        <div class="govuk-grid-column-two-thirds">
            <h2 class="govuk-feedback__title">{title}</h2>
            {#if children}
                <div class="govuk-feedback__body">
                    {@render children()}
                </div>
            {/if}
        </div>
    </div>
</div>
