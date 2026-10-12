import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type TabsListProps = ComponentPropsWithoutRef<'ul'> & {
    class?: string;
    children?: ReactNode;
};

export default function TabsList({ class: className, children, ...rest }: TabsListProps) {
    const classes = ["govuk-tabs__list", className ?? ""].filter(Boolean).join(" ");

    return (
        <ul className={classes} {...rest}>
            {children ?? ""}
        </ul>
    );
}
