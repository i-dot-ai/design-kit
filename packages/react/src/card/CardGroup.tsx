import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type CardGroupProps = ComponentPropsWithoutRef<'div'> & {
    class?: string;
    children?: ReactNode;
};

export default function CardGroup({ class: className, children, ...rest }: CardGroupProps) {
    const classes = ["iai-card-group", className ?? ""].filter(Boolean).join(" ");

    return (
        <div className={classes} {...rest}>
            {children ?? ""}
        </div>
    );
}
