import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type ErrorSummaryListProps = ComponentPropsWithoutRef<'ul'> & {
    class?: string;
    children?: ReactNode;
};

export default function ErrorSummaryList({ class: className, children, ...rest }: ErrorSummaryListProps) {
    const classes = ["govuk-list govuk-error-summary__list", className ?? ""].filter(Boolean).join(" ");

    return (
        <ul className={classes} {...rest}>
            {children ?? ""}
        </ul>
    );
}
