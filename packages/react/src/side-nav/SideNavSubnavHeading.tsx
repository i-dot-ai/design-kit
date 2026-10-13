import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type SideNavSubnavHeadingProps = ComponentPropsWithoutRef<'h3'> & {
    class?: string;
    children?: ReactNode;
};

export default function SideNavSubnavHeading({ class: className, children, ...rest }: SideNavSubnavHeadingProps) {
    const classes = ["side-nav__section-heading", className ?? ""].filter(Boolean).join(" ");

    return (
        <h3 className={classes} {...rest}>
            {children ?? ""}
        </h3>
    );
}
