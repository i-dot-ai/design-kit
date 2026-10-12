import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type PanelTitleProps = ComponentPropsWithoutRef<'h1'> & {
    class?: string;
    children?: ReactNode;
};

export default function PanelTitle({ class: className, children, ...rest }: PanelTitleProps) {
    const classes = ["govuk-panel__title", className ?? ""].filter(Boolean).join(" ");

    return (
        <h1 className={classes} {...rest}>
            {children}
        </h1>
    );
}
