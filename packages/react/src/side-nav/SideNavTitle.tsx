import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type SideNavTitleProps = ComponentPropsWithoutRef<'h2'> & {
    class?: string;
    children?: ReactNode;
};

export default function SideNavTitle({ class: className, children, ...rest }: SideNavTitleProps) {
    const classes = ["side-nav__title", className ?? ""].filter(Boolean).join(" ");

    return (
        <h2 className={classes} {...rest}>
            {children ?? ""}
        </h2>
    );
}
