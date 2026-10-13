import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type PaginationItemProps = ComponentPropsWithoutRef<'a'> & {
    current?: boolean;
    ellipsis?: boolean;
    /** aria-label for the page link (e.g. "Page 2"). */
    ariaLabel?: string;
    class?: string;
    children?: ReactNode;
};

export default function PaginationItem({ current, ellipsis, ariaLabel, class: className, children, ...rest }: PaginationItemProps) {
    if (ellipsis) {
        return (
            <li className="govuk-pagination__item govuk-pagination__item--ellipsis">
                {children ?? "⋯"}
            </li>
        );
    }

    const itemClasses = ["govuk-pagination__item", current ? "govuk-pagination__item--current" : ""]
        .filter(Boolean)
        .join(" ");
    const linkClasses = ["govuk-link govuk-pagination__link", className ?? ""].filter(Boolean).join(" ");

    return (
        <li className={itemClasses}>
            <a
                className={linkClasses}
                aria-label={ariaLabel}
                aria-current={current ? "page" : undefined}
                {...rest}
            >
                {children ?? ""}
            </a>
        </li>
    );
}
