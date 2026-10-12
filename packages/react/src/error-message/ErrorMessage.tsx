import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type ErrorMessageProps = ComponentPropsWithoutRef<'p'> & {
    visuallyHiddenText?: string;
    class?: string;
    children?: ReactNode;
};

export default function ErrorMessage({ visuallyHiddenText = "Error", class: className, children, ...rest }: ErrorMessageProps) {
    const classes = ["govuk-error-message", className ?? ""].filter(Boolean).join(" ");

    return (
        <p className={classes} {...rest}>
            {visuallyHiddenText ? (
                <span className="govuk-visually-hidden">{visuallyHiddenText}:</span>
            ) : null}{" "}
            {children ?? ""}
        </p>
    );
}
