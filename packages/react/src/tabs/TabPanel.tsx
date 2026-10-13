import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type TabPanelProps = ComponentPropsWithoutRef<'div'> & {
    hidden?: boolean;
    class?: string;
    children?: ReactNode;
};

export default function TabPanel({ hidden, class: className, children, ...rest }: TabPanelProps) {
    const classes = [
        "govuk-tabs__panel",
        hidden ? "govuk-tabs__panel--hidden" : "",
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={classes} {...rest}>
            {children ?? ""}
        </div>
    );
}
