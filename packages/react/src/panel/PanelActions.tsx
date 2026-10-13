import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type PanelActionsProps = ComponentPropsWithoutRef<'div'> & {
    class?: string;
    children?: ReactNode;
};

export default function PanelActions({ class: className, children, ...rest }: PanelActionsProps) {
    const classes = ["govuk-panel__actions", className ?? ""].filter(Boolean).join(" ");

    return (
        <div className={classes} {...rest}>
            {children}
        </div>
    );
}
