import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type RadioLabelProps = ComponentPropsWithoutRef<'label'> & {
    class?: string;
    children?: ReactNode;
};

export default function RadioLabel({ class: className, children, ...rest }: RadioLabelProps) {
    const classes = ["govuk-label govuk-radios__label", className ?? ""].filter(Boolean).join(" ");

    return (
        <label className={classes} {...rest}>
            {children ?? ""}
        </label>
    );
}
