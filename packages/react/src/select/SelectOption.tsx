import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type SelectOptionProps = ComponentPropsWithoutRef<'option'> & {
    class?: string;
    children?: ReactNode;
};

export default function SelectOption({ class: className, children, ...rest }: SelectOptionProps) {
    const classes = ["", className ?? ""].filter(Boolean).join(" ");

    return (
        <option className={classes} {...rest}>
            {children ?? ""}
        </option>
    );
}
