import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type ListItemProps = ComponentPropsWithoutRef<'li'> & {
    class?: string;
    children?: ReactNode;
};

export default function ListItem({ class: className, children, ...rest }: ListItemProps) {
    const classes = ["govuk-list-item", className ?? ""].filter(Boolean).join(" ");

    return (
        <li className={classes} {...rest}>
            {children ?? ""}
        </li>
    );
}
