/** @jsxImportSource react */

import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type TableHeaderProps = ComponentPropsWithoutRef<'th'> & {
    numeric?: boolean;
    scope?: "col" | "row" | "colgroup" | "rowgroup";
    class?: string;
    children?: ReactNode;
};

export default function TableHeader({ numeric, scope = "col", class: className, children, ...rest }: TableHeaderProps) {
    const classes = [
        "govuk-table__header",
        numeric ? "govuk-table__header--numeric" : "",
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <th className={classes} scope={scope} {...rest}>
            {children ?? ""}
        </th>
    );
}
