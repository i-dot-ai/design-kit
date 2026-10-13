import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type CardIconProps = ComponentPropsWithoutRef<'div'> & {
    class?: string;
    children?: ReactNode;
};

export default function CardIcon({ class: className, children, ...rest }: CardIconProps) {
    const classes = ["iai-card__icon", className ?? ""].filter(Boolean).join(" ");

    return (
        <div className={classes} aria-hidden="true" {...rest}>
            {children ?? ""}
        </div>
    );
}
