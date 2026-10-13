<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLInputAttributes } from "svelte/elements";

    type Props = HTMLInputAttributes & {
        class?: string;
        children?: Snippet;
    };

    let { class: className = "", children, ...rest }: Props = $props();

    let classes = $derived(["govuk-input govuk-password-input__input govuk-js-password-input-input", className].filter(Boolean).join(" "));
</script>

<div class="govuk-input__wrapper govuk-password-input__wrapper">
    <input class={classes} type="password" spellcheck="false" autocomplete="current-password" autocapitalize="none" {...rest} />
    <button class="govuk-button govuk-button--secondary govuk-password-input__toggle govuk-js-password-input-toggle" type="button" data-module="govuk-button" aria-label="Show password" hidden="">
        {#if children}{@render children()}{:else}Show{/if}
    </button>
</div>
