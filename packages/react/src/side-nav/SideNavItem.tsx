import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type SideNavItemProps = ComponentPropsWithoutRef<'li'> & {
    href?: string;
    class?: string;
    children?: ReactNode;
};

export default function SideNavItem({ href, class: className, children, ...rest }: SideNavItemProps) {
    const classes = ["side-nav__item", className ?? ""].filter(Boolean).join(" ");

    return (
        <li className={classes} {...rest}>
            <a className="govuk-link govuk-link--no-visited-state govuk-!-font-size-16 govuk-link--no-underline" href={href}>
                {children ?? ""}
            </a>
        </li>
    );
}
