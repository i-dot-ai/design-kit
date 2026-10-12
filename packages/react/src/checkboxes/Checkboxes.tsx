import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type CheckboxesProps = ComponentPropsWithoutRef<'div'> & {
    small?: boolean;
    subtle?: boolean;
    class?: string;
    children?: ReactNode;
};

export default function Checkboxes({ small, subtle, class: className, children, ...rest }: CheckboxesProps) {
    const classes = [
        "govuk-checkboxes",
        small ? "govuk-checkboxes--small" : "",
        subtle ? "govuk-checkboxes--subtle" : "",
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={classes} data-module="govuk-checkboxes" {...rest}>
            {children ?? ""}
        </div>
    );
}
