import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type BackLinkProps = ComponentPropsWithoutRef<'a'> & {
    inverse?: boolean;
    class?: string;
    children?: ReactNode;
};

export default function BackLink({ inverse, class: className, children, ...rest }: BackLinkProps) {
    const classes = [
        "govuk-back-link",
        inverse ? "govuk-back-link--inverse" : "",
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
