import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type PanelBodyProps = ComponentPropsWithoutRef<'div'> & {
    class?: string;
    children?: ReactNode;
};

export default function PanelBody({ class: className, children, ...rest }: PanelBodyProps) {
    const classes = ["govuk-panel__body", className ?? ""].filter(Boolean).join(" ");

    return (
        <div className={classes} {...rest}>
            {children}
        </div>
    );
}
