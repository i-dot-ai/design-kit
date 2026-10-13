import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type SummaryCardTitleProps = ComponentPropsWithoutRef<'h2'> & {
    class?: string;
    children?: ReactNode;
};

export default function SummaryCardTitle({ class: className, children, ...rest }: SummaryCardTitleProps) {
    const classes = ["govuk-summary-card__title", className ?? ""].filter(Boolean).join(" ");

    return (
        <h2 className={classes} {...rest}>
            {children ?? ""}
        </h2>
    );
}
