import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type ServiceNavigationItemProps = ComponentPropsWithoutRef<'a'> & ComponentPropsWithoutRef<'span'> & {
    href?: string;
    /** Current page — adds active styling + aria-current="page". */
    current?: boolean;
    /** Active section — adds active styling + aria-current="true". */
    active?: boolean;
    class?: string;
    children?: ReactNode;
};

export default function ServiceNavigationItem({ href, current, active, class: className, children, ...rest }: ServiceNavigationItemProps) {
    const isActive = current || active;
    const classes = [
        "govuk-service-navigation__item",
        isActive ? "govuk-service-navigation__item--active" : "",
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    const ariaCurrent = current ? "page" : active ? "true" : undefined;
    const inner = isActive
        ? <strong className="govuk-service-navigation__active-fallback">{children ?? ""}</strong>
        : children ?? "";

    return (
        <li className={classes}>
            {href !== undefined ? (
                <a className="govuk-service-navigation__link" href={href} aria-current={ariaCurrent} {...rest}>
                    {inner}
                </a>
            ) : (
                <span className="govuk-service-navigation__text" aria-current={ariaCurrent} {...rest}>
                    {inner}
                </span>
            )}
        </li>
    );
}
