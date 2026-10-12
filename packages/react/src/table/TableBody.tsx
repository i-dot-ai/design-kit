/** @jsxImportSource react */

import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type TableBodyProps = ComponentPropsWithoutRef<'tbody'> & {
    class?: string;
    children?: ReactNode;
};

export default function TableBody({ class: className, children, ...rest }: TableBodyProps) {
    const classes = ["govuk-table__body", className ?? ""].filter(Boolean).join(" ");

    return (
        <tbody className={classes} {...rest}>
            {children ?? ""}
        </tbody>
    );
}
