<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLElement> & HTMLAttributes<HTMLDivElement> & {
        sideNav?: boolean;
        inverse?: boolean;
        serviceName?: string;
        serviceUrl?: string;
        navigationId?: string;
        menuButtonText?: string;
        ariaLabel?: string;
        /** Whether to render the navigation `<nav>` (omitted when there are no items). */
        hasNavigation?: boolean;
        /** Show the mobile menu toggle. Defaults to true when there is >1 item. */
        collapseNavigationOnMobile?: boolean;
        /** Raw HTML for the `end` slot (e.g. language navigation). */
        endSlot?: Snippet;
        /** Align the end slot inline (adds the inlining container class). */
        endSlotInline?: boolean;
        class?: string;
        children?: Snippet;
    };

    let {
        sideNav = false,
        inverse = false,
        serviceName,
        serviceUrl,
        navigationId = "navigation",
        menuButtonText = "Menu",
        ariaLabel,
        hasNavigation = true,
        collapseNavigationOnMobile = false,
        endSlot,
        endSlotInline = false,
        class: className = "",
        children,
        ...rest
    }: Props = $props();

    let classes = $derived(
        [
            "govuk-service-navigation",
            sideNav ? "govuk-service-navigation--side-nav" : "",
            inverse ? "govuk-service-navigation--inverse" : "",
            className,
        ]
            .filter(Boolean)
            .join(" "),
    );
    let navLabel = $derived(ariaLabel ?? menuButtonText);
    let containerClasses = $derived(
        ["govuk-width-container", endSlotInline ? "govuk-service-navigation__inlining-container" : ""]
            .filter(Boolean)
            .join(" "),
    );
    let useSection = $derived(serviceName !== undefined || endSlot !== undefined);
</script>

{#snippet inner()}
    <div class={containerClasses}>
        <div class="govuk-service-navigation__container">
            {#if serviceName !== undefined}
                <span class="govuk-service-navigation__service-name">
                    {#if serviceUrl !== undefined}
                        <a href={serviceUrl} class="govuk-service-navigation__link">{serviceName}</a>
                    {:else}
                        <span class="govuk-service-navigation__text">{serviceName}</span>
                    {/if}
                </span>
            {/if}
            {#if hasNavigation}
                <nav aria-label={navLabel} class="govuk-service-navigation__wrapper">
                    {#if collapseNavigationOnMobile}
                        <button type="button" class="govuk-service-navigation__toggle govuk-js-service-navigation-toggle" aria-controls={navigationId} hidden aria-hidden="true">
                            {menuButtonText}
                        </button>
                    {/if}
                    <ul class="govuk-service-navigation__list" id={navigationId}>
                        {@render children?.()}
                    </ul>
                </nav>
            {/if}
        </div>
        {#if endSlot}{@render endSlot()}{/if}
    </div>
{/snippet}

{#if useSection}
    <section aria-label={ariaLabel ?? "Service information"} class={classes} data-module="govuk-service-navigation" {...rest}>
        {@render inner()}
    </section>
{:else}
    <div class={classes} data-module="govuk-service-navigation" {...rest}>
        {@render inner()}
    </div>
{/if}
