import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type SelectProps = ComponentPropsWithoutRef<'select'> & {
    subtle?: boolean;
    error?: boolean;
    class?: string;
    children?: ReactNode;
};

export default function Select({ subtle, error, class: className, children, ...rest }: SelectProps) {
    const classes = [
        "govuk-select",
        subtle ? "govuk-select--subtle" : "",
        error ? "govuk-select--error" : "",
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <select className={classes} {...rest}>
            {children ?? ""}
        </select>
    );
}
