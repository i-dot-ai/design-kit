import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type CardHeadingProps = ComponentPropsWithoutRef<'div'> & {
    class?: string;
    children?: ReactNode;
};

export default function CardHeading({ class: className, children, ...rest }: CardHeadingProps) {
    const classes = ["iai-card__heading", className ?? ""].filter(Boolean).join(" ");

    return (
        <div className={classes} {...rest}>
            {children ?? ""}
        </div>
    );
}
