import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type SideNavListProps = ComponentPropsWithoutRef<'ul'> & {
    class?: string;
    children?: ReactNode;
};

export default function SideNavList({ class: className, children, ...rest }: SideNavListProps) {
    const classes = ["govuk-list govuk-list--spaced", className ?? ""].filter(Boolean).join(" ");

    return (
        <ul className={classes} {...rest}>
            {children ?? ""}
        </ul>
    );
}
