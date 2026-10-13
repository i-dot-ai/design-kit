import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type SummaryListActionsProps = ComponentPropsWithoutRef<'dd'> & {
    class?: string;
    children?: ReactNode;
};

export default function SummaryListActions({ class: className, children, ...rest }: SummaryListActionsProps) {
    const classes = ["govuk-summary-list__actions", className ?? ""].filter(Boolean).join(" ");

    return (
        <dd className={classes} {...rest}>
            {children ?? ""}
        </dd>
    );
}
