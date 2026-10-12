import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type SideNavProps = ComponentPropsWithoutRef<'nav'> & {
    class?: string;
    children?: ReactNode;
};

export default function SideNav({ class: className, children, ...rest }: SideNavProps) {
    const classes = ["side-nav", className ?? ""].filter(Boolean).join(" ");

    return (
        <nav className={classes} {...rest}>
            {children ?? ""}
        </nav>
    );
}
