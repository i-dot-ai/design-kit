import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type CardContentProps = ComponentPropsWithoutRef<'div'> & {
    class?: string;
    children?: ReactNode;
};

export default function CardContent({ class: className, children, ...rest }: CardContentProps) {
    const classes = ["iai-card__content", className ?? ""].filter(Boolean).join(" ");

    return (
        <div className={classes} {...rest}>
            {children ?? ""}
        </div>
    );
}
