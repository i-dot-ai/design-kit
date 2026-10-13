import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type BreadcrumbsProps = ComponentPropsWithoutRef<'nav'> & {
    inverse?: boolean;
    collapseOnMobile?: boolean;
    class?: string;
    children?: ReactNode;
};

export default function Breadcrumbs({ inverse, collapseOnMobile, class: className, children, ...rest }: BreadcrumbsProps) {
    const classes = [
        "govuk-breadcrumbs",
        inverse ? "govuk-breadcrumbs--inverse" : "",
        collapseOnMobile ? "govuk-breadcrumbs--collapse-on-mobile" : "",
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <nav className={classes} aria-label="Breadcrumb" {...rest}>
            <ol className="govuk-breadcrumbs__list">
                {children ?? ""}
            </ol>
        </nav>
    );
}
