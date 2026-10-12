import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type CheckboxItemProps = ComponentPropsWithoutRef<'div'> & {
    class?: string;
    children?: ReactNode;
};

export default function CheckboxItem({ class: className, children, ...rest }: CheckboxItemProps) {
    const classes = ["govuk-checkboxes__item", className ?? ""].filter(Boolean).join(" ");

    return (
        <div className={classes} {...rest}>
            {children ?? ""}
        </div>
    );
}
