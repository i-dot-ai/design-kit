import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type RadiosProps = ComponentPropsWithoutRef<'div'> & {
    inline?: boolean;
    small?: boolean;
    class?: string;
    children?: ReactNode;
};

export default function Radios({ inline, small, class: className, children, ...rest }: RadiosProps) {
    const classes = [
        "govuk-radios",
        inline ? "govuk-radios--inline" : "",
        small ? "govuk-radios--small" : "",
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={classes} data-module="govuk-radios" {...rest}>
            {children ?? ""}
        </div>
    );
}
