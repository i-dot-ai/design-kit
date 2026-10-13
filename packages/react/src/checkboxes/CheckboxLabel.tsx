import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type CheckboxLabelProps = ComponentPropsWithoutRef<'label'> & {
    class?: string;
    children?: ReactNode;
};

export default function CheckboxLabel({ class: className, children, ...rest }: CheckboxLabelProps) {
    const classes = ["govuk-label govuk-checkboxes__label", className ?? ""].filter(Boolean).join(" ");

    return (
        <label className={classes} {...rest}>
            {children ?? ""}
        </label>
    );
}
