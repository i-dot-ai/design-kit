import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type CardLinkProps = ComponentPropsWithoutRef<'a'> & {
    class?: string;
    children?: ReactNode;
};

export default function CardLink({ class: className, children, ...rest }: CardLinkProps) {
    const classes = ["iai-card__link", className ?? ""].filter(Boolean).join(" ");

    return (
        <a className={classes} {...rest}>
            {children ?? ""}
        </a>
    );
}
