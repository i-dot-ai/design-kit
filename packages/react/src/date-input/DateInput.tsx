import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type DateInputProps = ComponentPropsWithoutRef<'div'> & {
    class?: string;
    children?: ReactNode;
};

export default function DateInput({ class: className, children, ...rest }: DateInputProps) {
    const classes = ["govuk-date-input", className ?? ""].filter(Boolean).join(" ");

    return (
        <div className={classes} {...rest}>
            {children ?? ""}
        </div>
    );
}
