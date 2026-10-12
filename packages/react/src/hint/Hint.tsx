import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type HintProps = ComponentPropsWithoutRef<'div'> & {
    class?: string;
    children?: ReactNode;
};

export default function Hint({ class: className, children, ...rest }: HintProps) {
    const classes = ["govuk-hint", className ?? ""].filter(Boolean).join(" ");

    return (
        <div className={classes} {...rest}>
            {children ?? ""}
        </div>
    );
}
