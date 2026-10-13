import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type DetailsTextProps = ComponentPropsWithoutRef<'div'> & {
    class?: string;
    children?: ReactNode;
};

export default function DetailsText({ class: className, children, ...rest }: DetailsTextProps) {
    const classes = ["govuk-details__text", className ?? ""].filter(Boolean).join(" ");

    return (
        <div className={classes} {...rest}>
            {children ?? ""}
        </div>
    );
}
