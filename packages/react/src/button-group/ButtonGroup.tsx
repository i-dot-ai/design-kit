import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type ButtonGroupProps = ComponentPropsWithoutRef<'div'> & {
    class?: string;
    children?: ReactNode;
};

export default function ButtonGroup({ class: className, children, ...rest }: ButtonGroupProps) {
    const classes = ["govuk-button-group", className ?? ""].filter(Boolean).join(" ");

    return (
        <div className={classes} {...rest}>
            {children ?? ""}
        </div>
    );
}
