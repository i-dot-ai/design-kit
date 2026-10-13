/** @jsxImportSource react */

import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type TableCellProps = ComponentPropsWithoutRef<'td'> & {
    numeric?: boolean;
    stretch?: boolean;
    noWrap?: boolean;
    small?: boolean;
    class?: string;
    children?: ReactNode;
};

export default function TableCell({ numeric, stretch, noWrap, small, class: className, children, ...rest }: TableCellProps) {
    const classes = [
        "govuk-table__cell",
        numeric ? "govuk-table__cell--numeric" : "",
        stretch ? "govuk-table__cell--stretch" : "",
        noWrap ? "govuk-table__cell--no-wrap" : "",
        small ? "govuk-table__cell--small" : "",
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <td className={classes} {...rest}>
            {children ?? ""}
        </td>
    );
}
