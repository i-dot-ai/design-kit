import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type SummaryListRowProps = ComponentPropsWithoutRef<'div'> & {
    noActions?: boolean;
    class?: string;
    children?: ReactNode;
};

export default function SummaryListRow({ noActions, class: className, children, ...rest }: SummaryListRowProps) {
    const classes = [
        "govuk-summary-list__row",
        noActions ? "govuk-summary-list__row--no-actions" : "",
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={classes} {...rest}>
            {children ?? ""}
        </div>
    );
}
