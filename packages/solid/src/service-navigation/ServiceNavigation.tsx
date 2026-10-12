/** @jsxImportSource solid-js */

import { splitProps, Show, mergeProps } from "solid-js";
import type { JSX } from "solid-js";

type ServiceNavigationProps = JSX.IntrinsicElements['section'] & JSX.IntrinsicElements['div'] & {
    sideNav?: boolean;
    inverse?: boolean;
    serviceName?: string;
    serviceUrl?: string;
    navigationId?: string;
    menuButtonText?: string;
    ariaLabel?: string;
    hasNavigation?: boolean;
    collapseNavigationOnMobile?: boolean;
    endSlot?: JSX.Element;
    endSlotInline?: boolean;
    class?: string;
    children?: JSX.Element;
};

export default function ServiceNavigation(rawProps: ServiceNavigationProps) {
    const props = mergeProps(
        { navigationId: "navigation", menuButtonText: "Menu", hasNavigation: true },
        rawProps,
    );
    const [local, rest] = splitProps(props, [
        "sideNav",
        "inverse",
        "serviceName",
        "serviceUrl",
        "navigationId",
        "menuButtonText",
        "ariaLabel",
        "hasNavigation",
        "collapseNavigationOnMobile",
        "endSlot",
        "endSlotInline",
        "class",
        "children",
    ]);

    const classes = () =>
        [
            "govuk-service-navigation",
            local.sideNav ? "govuk-service-navigation--side-nav" : "",
            local.inverse ? "govuk-service-navigation--inverse" : "",
            local.class ?? "",
        ]
            .filter(Boolean)
            .join(" ");

    const navLabel = () => local.ariaLabel ?? local.menuButtonText;
    const containerClasses = () =>
        [
            "govuk-width-container",
            local.endSlotInline ? "govuk-service-navigation__inlining-container" : "",
        ]
            .filter(Boolean)
            .join(" ");
    const useSection = () => local.serviceName !== undefined || local.endSlot !== undefined;

    const inner = () => (
        <div class={containerClasses()}>
            <div class="govuk-service-navigation__container">
                <Show when={local.serviceName !== undefined}>
                    <span class="govuk-service-navigation__service-name">
                        <Show
                            when={local.serviceUrl !== undefined}
                            fallback={<span class="govuk-service-navigation__text">{local.serviceName}</span>}
                        >
                            <a href={local.serviceUrl} class="govuk-service-navigation__link">
                                {local.serviceName}
                            </a>
                        </Show>
                    </span>
                </Show>
                <Show when={local.hasNavigation}>
                    <nav aria-label={navLabel()} class="govuk-service-navigation__wrapper">
                        <Show when={local.collapseNavigationOnMobile}>
                            <button
                                type="button"
                                class="govuk-service-navigation__toggle govuk-js-service-navigation-toggle"
                                aria-controls={local.navigationId}
                                hidden
                                aria-hidden="true"
                            >
                                {local.menuButtonText}
                            </button>
                        </Show>
                        <ul class="govuk-service-navigation__list" id={local.navigationId}>
                            {local.children ?? ""}
                        </ul>
                    </nav>
                </Show>
            </div>
            {local.endSlot}
        </div>
    );

    return (
        <Show
            when={useSection()}
            fallback={
                <div class={classes()} data-module="govuk-service-navigation" {...rest}>
                    {inner()}
                </div>
            }
        >
            <section
                aria-label={local.ariaLabel ?? "Service information"}
                class={classes()}
                data-module="govuk-service-navigation"
                {...rest}
            >
                {inner()}
            </section>
        </Show>
    );
}
