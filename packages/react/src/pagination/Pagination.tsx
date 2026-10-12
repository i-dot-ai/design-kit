import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type PaginationProps = ComponentPropsWithoutRef<'nav'> & {
    block?: boolean;
    class?: string;
    children?: ReactNode;
};

export default function Pagination({ block, class: className, children, ...rest }: PaginationProps) {
    const classes = [
        "govuk-pagination",
        block ? "govuk-pagination--block" : "",
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <nav className={classes} aria-label="Pagination" {...rest}>
            {children ?? ""}
        </nav>
    );
}
