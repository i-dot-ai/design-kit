/** @jsxImportSource react */

import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type TableHeadProps = ComponentPropsWithoutRef<'thead'> & {
    class?: string;
    children?: ReactNode;
};

export default function TableHead({ class: className, children, ...rest }: TableHeadProps) {
    const classes = ["govuk-table__head", className ?? ""].filter(Boolean).join(" ");

    return (
        <thead className={classes} {...rest}>
            {children ?? ""}
        </thead>
    );
}
