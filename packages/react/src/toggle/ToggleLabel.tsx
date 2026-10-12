import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type ToggleLabelProps = ComponentPropsWithoutRef<'label'> & {
    class?: string;
    children?: ReactNode;
};

export default function ToggleLabel({ class: className, children, ...rest }: ToggleLabelProps) {
    const classes = ["govuk-label iai-toggle__label", className ?? ""].filter(Boolean).join(" ");

    return (
        <label className={classes} {...rest}>
            {children ?? ""}
        </label>
    );
}
