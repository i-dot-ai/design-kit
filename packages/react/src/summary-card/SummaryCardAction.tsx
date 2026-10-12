import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type SummaryCardActionProps = ComponentPropsWithoutRef<'li'> & {
    class?: string;
    children?: ReactNode;
};

export default function SummaryCardAction({ class: className, children, ...rest }: SummaryCardActionProps) {
    const classes = ["govuk-summary-card__action", className ?? ""].filter(Boolean).join(" ");

    return (
        <li className={classes} {...rest}>
            {children ?? ""}
        </li>
    );
}
