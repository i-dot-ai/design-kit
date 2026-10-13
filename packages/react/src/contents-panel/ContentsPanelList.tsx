import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type ContentsPanelListProps = ComponentPropsWithoutRef<'ul'> & {
    class?: string;
    children?: ReactNode;
};

export default function ContentsPanelList({ class: className, children, ...rest }: ContentsPanelListProps) {
    const classes = ["contents-panel__list", className ?? ""].filter(Boolean).join(" ");

    return (
        <ul className={classes} {...rest}>
            {children}
        </ul>
    );
}
