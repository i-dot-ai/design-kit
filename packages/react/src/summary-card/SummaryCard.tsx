import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type SummaryCardProps = ComponentPropsWithoutRef<'div'> & {
    class?: string;
    children?: ReactNode;
};

export default function SummaryCard({ class: className, children, ...rest }: SummaryCardProps) {
    const classes = ["govuk-summary-card", className ?? ""].filter(Boolean).join(" ");

    return (
        <div className={classes} {...rest}>
            {children ?? ""}
        </div>
    );
}
