/** @jsxImportSource react */

import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type TableSearchAndFilterProps = ComponentPropsWithoutRef<'div'> & {
    class?: string;
    children?: ReactNode;
};

export default function TableSearchAndFilter({ class: className, children, ...rest }: TableSearchAndFilterProps) {
    const classes = ["govuk-table__search-and-filter-wrapper", className ?? ""].filter(Boolean).join(" ");

    return (
        <div className={classes} {...rest}>
            {children ?? ""}
        </div>
    );
}
