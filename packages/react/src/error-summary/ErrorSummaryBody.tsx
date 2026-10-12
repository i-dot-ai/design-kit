import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type ErrorSummaryBodyProps = ComponentPropsWithoutRef<'div'> & {
    class?: string;
    children?: ReactNode;
};

export default function ErrorSummaryBody({ class: className, children, ...rest }: ErrorSummaryBodyProps) {
    const classes = ["govuk-error-summary__body", className ?? ""].filter(Boolean).join(" ");

    return (
        <div className={classes} {...rest}>
            {children ?? ""}
        </div>
    );
}
