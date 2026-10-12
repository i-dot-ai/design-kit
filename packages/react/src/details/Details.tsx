import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type DetailsProps = ComponentPropsWithoutRef<'details'> & {
    class?: string;
    children?: ReactNode;
};

export default function Details({ class: className, children, ...rest }: DetailsProps) {
    const classes = ["govuk-details", className ?? ""].filter(Boolean).join(" ");

    return (
        <details className={classes} {...rest}>
            {children ?? ""}
        </details>
    );
}
