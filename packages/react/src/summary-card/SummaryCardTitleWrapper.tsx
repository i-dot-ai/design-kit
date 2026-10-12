import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type SummaryCardTitleWrapperProps = ComponentPropsWithoutRef<'div'> & {
    class?: string;
    children?: ReactNode;
};

export default function SummaryCardTitleWrapper({ class: className, children, ...rest }: SummaryCardTitleWrapperProps) {
    const classes = ["govuk-summary-card__title-wrapper", className ?? ""].filter(Boolean).join(" ");

    return (
        <div className={classes} {...rest}>
            {children ?? ""}
        </div>
    );
}
