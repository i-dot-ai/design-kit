import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type SummaryCardContentProps = ComponentPropsWithoutRef<'div'> & {
    class?: string;
    children?: ReactNode;
};

export default function SummaryCardContent({ class: className, children, ...rest }: SummaryCardContentProps) {
    const classes = ["govuk-summary-card__content", className ?? ""].filter(Boolean).join(" ");

    return (
        <div className={classes} {...rest}>
            {children ?? ""}
        </div>
    );
}
