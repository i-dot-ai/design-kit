import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type ToggleItemProps = ComponentPropsWithoutRef<'div'> & {
    class?: string;
    children?: ReactNode;
};

export default function ToggleItem({ class: className, children, ...rest }: ToggleItemProps) {
    const classes = ["iai-toggle__item", className ?? ""].filter(Boolean).join(" ");

    return (
        <div className={classes} {...rest}>
            {children ?? ""}
        </div>
    );
}
