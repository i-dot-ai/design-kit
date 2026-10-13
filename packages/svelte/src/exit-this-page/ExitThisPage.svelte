<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement> & {
        redirectUrl?: string;
        id?: string;
        class?: string;
        children?: Snippet;
    };

    let {
        redirectUrl = "https://www.bbc.co.uk/weather",
        id,
        class: className = "",
        children,
        ...rest
    }: Props = $props();

    let classes = $derived(
        ["govuk-exit-this-page", className].filter(Boolean).join(" "),
    );
</script>

<div {id} class={classes} data-module="govuk-exit-this-page" {...rest}>
    <a
        href={redirectUrl}
        role="button"
        draggable="false"
        class="govuk-button govuk-button--warning govuk-exit-this-page__button govuk-js-exit-this-page-button"
        data-module="govuk-button"
        rel="nofollow noreferrer"
    >
        {#if children}{@render children()}{:else}<span class="govuk-visually-hidden">Emergency</span> Exit this page{/if}
    </a>
</div>
