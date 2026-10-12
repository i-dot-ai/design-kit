import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type ErrorSummaryTitleProps = ComponentPropsWithoutRef<'h2'> & {
    class?: string;
    children?: ReactNode;
};

export default function ErrorSummaryTitle({ class: className, children, ...rest }: ErrorSummaryTitleProps) {
    const classes = ["govuk-error-summary__title", className ?? ""].filter(Boolean).join(" ");

    return (
        <h2 className={classes} {...rest}>
            {children ?? ""}
        </h2>
    );
}
