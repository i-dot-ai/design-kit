<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement> & {
        success?: string;
        class?: string;
        children?: Snippet;
    };

    let { success, class: className = "", children, ...rest }: Props = $props();
</script>

{#if success}
<div class={["govuk-notification-banner govuk-notification-banner--success", className].filter(Boolean).join(" ")} role="alert" aria-labelledby="govuk-notification-banner-title" data-module="govuk-notification-banner" {...rest}>
    {@render children?.()}
</div>
{:else}
<div class={["govuk-notification-banner", className].filter(Boolean).join(" ")} role="region" aria-labelledby="govuk-notification-banner-title" data-module="govuk-notification-banner" {...rest}>
    {@render children?.()}
</div>
{/if}
