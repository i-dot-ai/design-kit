import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type ContentsPanelProps = ComponentPropsWithoutRef<'nav'> & {
    heading?: string;
    headingId?: string;
    class?: string;
    children?: ReactNode;
};

export default function ContentsPanel({
    heading = "Pages in this section",
    headingId = "contents-panel-heading",
    class: className,
    children,
    ...rest
}: ContentsPanelProps) {
    const classes = ["contents-panel", className ?? ""].filter(Boolean).join(" ");

    return (
        <nav className={classes} aria-labelledby={headingId} {...rest}>
            <h2 className="govuk-visually-hidden" id={headingId}>
                {heading}
            </h2>
            {children}
        </nav>
    );
}
