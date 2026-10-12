import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type SummaryCardActionsProps = ComponentPropsWithoutRef<'div'> & ComponentPropsWithoutRef<'ul'> & {
    /** Render as a single-action wrapper (`<div>`) instead of a list (`<ul>`).
     *  govuk uses a div for exactly one action and a ul for multiple. */
    single?: boolean;
    class?: string;
    children?: ReactNode;
};

export default function SummaryCardActions({ single, class: className, children, ...rest }: SummaryCardActionsProps) {
    const classes = ["govuk-summary-card__actions", className ?? ""].filter(Boolean).join(" ");

    if (single) {
        return (
            <div className={classes} {...rest}>
                {children ?? ""}
            </div>
        );
    }

    return (
        <ul className={classes} {...rest}>
            {children ?? ""}
        </ul>
    );
}
