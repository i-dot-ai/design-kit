import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type SideNavSubnavListProps = ComponentPropsWithoutRef<'ul'> & {
    class?: string;
    children?: ReactNode;
};

export default function SideNavSubnavList({ class: className, children, ...rest }: SideNavSubnavListProps) {
    const classes = ["side-nav__subnav-list", className ?? ""].filter(Boolean).join(" ");

    return (
        <ul className={classes} {...rest}>
            {children ?? ""}
        </ul>
    );
}
