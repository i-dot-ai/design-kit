/** @jsxImportSource react */

import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type TableRowProps = ComponentPropsWithoutRef<'tr'> & {
    class?: string;
    children?: ReactNode;
};

export default function TableRow({ class: className, children, ...rest }: TableRowProps) {
    const classes = ["govuk-table__row", className ?? ""].filter(Boolean).join(" ");

    return (
        <tr className={classes} {...rest}>
            {children ?? ""}
        </tr>
    );
}
