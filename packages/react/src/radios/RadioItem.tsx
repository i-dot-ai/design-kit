import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type RadioItemProps = ComponentPropsWithoutRef<'div'> & {
    class?: string;
    children?: ReactNode;
};

export default function RadioItem({ class: className, children, ...rest }: RadioItemProps) {
    const classes = ["govuk-radios__item", className ?? ""].filter(Boolean).join(" ");

    return (
        <div className={classes} {...rest}>
            {children ?? ""}
        </div>
    );
}
