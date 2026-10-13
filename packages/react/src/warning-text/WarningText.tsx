import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type WarningTextProps = ComponentPropsWithoutRef<'div'> & {
    class?: string;
    children?: ReactNode;
};

export default function WarningText({ class: className, children, ...rest }: WarningTextProps) {
    const classes = ["govuk-warning-text", className ?? ""].filter(Boolean).join(" ");

    return (
        <div className={classes} {...rest}>
            <span className="govuk-warning-text__icon" aria-hidden="true">
                !
            </span>
            <strong className="govuk-warning-text__text">
                <span className="govuk-visually-hidden">
                    Warning
                </span>
                {children ?? ""}
            </strong>
        </div>
    );
}
