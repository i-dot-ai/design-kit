/** @jsxImportSource react */

import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type TableCaptionProps = ComponentPropsWithoutRef<'caption'> & {
    size?: "small" | "medium" | "large" | "xl";
    class?: string;
    children?: ReactNode;
};

export default function TableCaption({ size, class: className, children, ...rest }: TableCaptionProps) {
    const classes = [
        "govuk-table__caption",
        (size ? { "small": "govuk-table__caption--s", "medium": "govuk-table__caption--m", "large": "govuk-table__caption--l", "xl": "govuk-table__caption--xl" }[size] : ""),
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <caption className={classes} {...rest}>
            {children ?? ""}
        </caption>
    );
}
