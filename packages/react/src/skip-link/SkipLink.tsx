import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type SkipLinkProps = ComponentPropsWithoutRef<'a'> & {
    class?: string;
    children?: ReactNode;
};

export default function SkipLink({ class: className, children, ...rest }: SkipLinkProps) {
    const classes = ["govuk-skip-link", className ?? ""].filter(Boolean).join(" ");

    return (
        <a className={classes} data-module="govuk-skip-link" {...rest}>
            {children ?? ""}
        </a>
    );
}
