import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type TabsTitleProps = ComponentPropsWithoutRef<'h2'> & {
    class?: string;
    children?: ReactNode;
};

export default function TabsTitle({ class: className, children, ...rest }: TabsTitleProps) {
    const classes = ["govuk-tabs__title", className ?? ""].filter(Boolean).join(" ");

    return (
        <h2 className={classes} {...rest}>
            {children ?? ""}
        </h2>
    );
}
