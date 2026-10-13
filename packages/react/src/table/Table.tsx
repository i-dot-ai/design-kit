/** @jsxImportSource react */
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type TableProps = ComponentPropsWithoutRef<'table'> & {
    smallTextUntilTablet?: boolean;
    subtle?: boolean;
    summary?: boolean;
    class?: string;
    children?: ReactNode;
};

export default function Table({ smallTextUntilTablet, subtle, summary, class: className, children, ...rest }: TableProps) {
    const classes = [
        "govuk-table",
        smallTextUntilTablet ? "govuk-table--small-text-until-tablet" : "",
        subtle ? "govuk-table--subtle" : "",
        summary ? "govuk-table--summary" : "",
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <table className={classes} {...rest}>
            {children ?? ""}
        </table>
    );
}
