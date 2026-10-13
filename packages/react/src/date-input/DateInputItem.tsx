import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type DateInputItemProps = ComponentPropsWithoutRef<'div'> & {
    class?: string;
    children?: ReactNode;
};

export default function DateInputItem({ class: className, children, ...rest }: DateInputItemProps) {
    const classes = ["govuk-date-input__item", className ?? ""].filter(Boolean).join(" ");

    return (
        <div className={classes} {...rest}>
            {children ?? ""}
        </div>
    );
}
