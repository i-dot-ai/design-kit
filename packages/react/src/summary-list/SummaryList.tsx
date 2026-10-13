import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type SummaryListProps = ComponentPropsWithoutRef<'dl'> & {
    noBorder?: boolean;
    class?: string;
    children?: ReactNode;
};

export default function SummaryList({ noBorder, class: className, children, ...rest }: SummaryListProps) {
    const classes = [
        "govuk-summary-list",
        noBorder ? "govuk-summary-list--no-border" : "",
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <dl className={classes} {...rest}>
            {children ?? ""}
        </dl>
    );
}
