import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type PaginationListProps = ComponentPropsWithoutRef<'ul'> & {
    class?: string;
    children?: ReactNode;
};

export default function PaginationList({ class: className, children, ...rest }: PaginationListProps) {
    const classes = ["govuk-pagination__list", className ?? ""].filter(Boolean).join(" ");

    return (
        <ul className={classes} {...rest}>
            {children ?? ""}
        </ul>
    );
}
