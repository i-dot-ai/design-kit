import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type ServiceNavigationProps = ComponentPropsWithoutRef<'section'> & ComponentPropsWithoutRef<'div'> & {
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
    endSlot?: ReactNode;
    /** Align the end slot inline (adds the inlining container class). */
    endSlotInline?: boolean;
    class?: string;
    children?: ReactNode;
};

export default function ServiceNavigation({
    sideNav,
    inverse,
    serviceName,
    serviceUrl,
    navigationId = "navigation",
    menuButtonText = "Menu",
    ariaLabel,
    hasNavigation = true,
    collapseNavigationOnMobile,
    endSlot,
    endSlotInline,
    class: className,
    children,
    ...rest
}: ServiceNavigationProps) {
    const classes = [
        "govuk-service-navigation",
        sideNav ? "govuk-service-navigation--side-nav" : "",
        inverse ? "govuk-service-navigation--inverse" : "",
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    const navLabel = ariaLabel ?? menuButtonText;
    const showToggle = collapseNavigationOnMobile ?? false;
    const useSection = serviceName !== undefined || endSlot !== undefined;

    const containerClasses = [
        "govuk-width-container",
        endSlotInline ? "govuk-service-navigation__inlining-container" : "",
    ]
        .filter(Boolean)
        .join(" ");

    const inner = (
        <div className={containerClasses}>
            <div className="govuk-service-navigation__container">
                {serviceName !== undefined && (
                    <span className="govuk-service-navigation__service-name">
                        {serviceUrl !== undefined ? (
                            <a href={serviceUrl} className="govuk-service-navigation__link">
                                {serviceName}
                            </a>
                        ) : (
                            <span className="govuk-service-navigation__text">{serviceName}</span>
                        )}
                    </span>
                )}
                {hasNavigation && (
                    <nav aria-label={navLabel} className="govuk-service-navigation__wrapper">
                        {showToggle && (
                            <button
                                type="button"
                                className="govuk-service-navigation__toggle govuk-js-service-navigation-toggle"
                                aria-controls={navigationId}
                                hidden
                                aria-hidden="true"
                            >
                                {menuButtonText}
                            </button>
                        )}
                        <ul className="govuk-service-navigation__list" id={navigationId}>
                            {children ?? ""}
                        </ul>
                    </nav>
                )}
            </div>
            {endSlot}
        </div>
    );

    if (useSection) {
        return (
            <section aria-label={ariaLabel ?? "Service information"} className={classes} data-module="govuk-service-navigation" {...rest}>
                {inner}
            </section>
        );
    }

    return (
        <div className={classes} data-module="govuk-service-navigation" {...rest}>
            {inner}
        </div>
    );
}
