import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type PaginationNextProps = ComponentPropsWithoutRef<'a'> & {
    /** Block-level layout (no numbered items, just prev/next). */
    block?: boolean;
    /** Descriptive label shown alongside the title (block layout only). */
    labelText?: string;
    class?: string;
    children?: ReactNode;
};

const arrow = (
    <svg className="govuk-pagination__icon govuk-pagination__icon--next" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
        <path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"></path>
    </svg>
);

export default function PaginationNext({ block, labelText, class: className, children, ...rest }: PaginationNextProps) {
    const classes = ["govuk-link govuk-pagination__link", className ?? ""].filter(Boolean).join(" ");
    const titleClasses = [
        "govuk-pagination__link-title",
        block && !labelText ? "govuk-pagination__link-title--decorated" : "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className="govuk-pagination__next">
            <a className={classes} rel="next" {...rest}>
                {block && arrow}
                <span className={titleClasses}>
                    {children ?? (
                        <>
                            Next<span className="govuk-visually-hidden"> page</span>
                        </>
                    )}
                </span>
                {labelText && block && (
                    <>
                        <span className="govuk-visually-hidden">:</span>
                        <span className="govuk-pagination__link-label">{labelText}</span>
                    </>
                )}
                {!block && arrow}
            </a>
        </div>
    );
}
