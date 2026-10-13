import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type PaginationPrevProps = ComponentPropsWithoutRef<'a'> & {
    /** Block-level layout (no numbered items, just prev/next). */
    block?: boolean;
    /** Descriptive label shown alongside the title (block layout only). */
    labelText?: string;
    class?: string;
    children?: ReactNode;
};

const arrow = (
    <svg className="govuk-pagination__icon govuk-pagination__icon--prev" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
        <path d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z"></path>
    </svg>
);

export default function PaginationPrev({ block, labelText, class: className, children, ...rest }: PaginationPrevProps) {
    const classes = ["govuk-link govuk-pagination__link", className ?? ""].filter(Boolean).join(" ");
    const titleClasses = [
        "govuk-pagination__link-title",
        block && !labelText ? "govuk-pagination__link-title--decorated" : "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className="govuk-pagination__prev">
            <a className={classes} rel="prev" {...rest}>
                {arrow}
                <span className={titleClasses}>
                    {children ?? (
                        <>
                            Previous<span className="govuk-visually-hidden"> page</span>
                        </>
                    )}
                </span>
                {labelText && block && (
                    <>
                        <span className="govuk-visually-hidden">:</span>
                        <span className="govuk-pagination__link-label">{labelText}</span>
                    </>
                )}
            </a>
        </div>
    );
}
