import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type ErrorSummaryProps = ComponentPropsWithoutRef<'div'> & {
    class?: string;
    children?: ReactNode;
};

export default function ErrorSummary({ class: className, children, ...rest }: ErrorSummaryProps) {
    const classes = ["govuk-error-summary", className ?? ""].filter(Boolean).join(" ");

    return (
        <div className={classes} data-module="govuk-error-summary" {...rest}>
            <div role="alert">
                {children ?? ""}
            </div>
        </div>
    );
}
