import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type InsetTextProps = ComponentPropsWithoutRef<'div'> & {
    class?: string;
    children?: ReactNode;
};

export default function InsetText({ class: className, children, ...rest }: InsetTextProps) {
    const classes = ["govuk-inset-text", className ?? ""].filter(Boolean).join(" ");

    return (
        <div className={classes} {...rest}>
            {children ?? ""}
        </div>
    );
}
