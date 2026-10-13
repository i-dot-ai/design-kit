import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type ContentsPanelListHeadingProps = ComponentPropsWithoutRef<'h3'> & {
    class?: string;
    children?: ReactNode;
};

export default function ContentsPanelListHeading({ class: className, children, ...rest }: ContentsPanelListHeadingProps) {
    const classes = ["contents-panel__list-heading", className ?? ""].filter(Boolean).join(" ");

    return (
        <h3 className={classes} {...rest}>
            {children}
        </h3>
    );
}
