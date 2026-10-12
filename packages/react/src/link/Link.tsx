import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type LinkProps = ComponentPropsWithoutRef<'a'> & {
    noUnderline?: boolean;
    noVisitedState?: boolean;
    variant?: "warning" | "inverse";
    class?: string;
    children?: ReactNode;
};

export default function Link({ noUnderline, noVisitedState, variant, class: className, children, ...rest }: LinkProps) {
    const classes = [
        "govuk-link",
        noUnderline ? "govuk-link--no-underline" : "",
        noVisitedState ? "govuk-link--no-visited-state" : "",
        (variant ? { "warning": "govuk-link--warning", "inverse": "govuk-link--inverse" }[variant] : ""),
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <a className={classes} {...rest}>
            {children ?? ""}
        </a>
    );
}
