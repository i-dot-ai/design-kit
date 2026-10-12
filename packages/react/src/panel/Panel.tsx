import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type PanelProps = ComponentPropsWithoutRef<'div'> & {
    class?: string;
    children?: ReactNode;
};

export default function Panel({ class: className, children, ...rest }: PanelProps) {
    const isInterruption = (className ?? "").includes("govuk-panel--interruption");
    const classes = [
        "govuk-panel",
        isInterruption ? "" : "govuk-panel--confirmation",
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={classes} {...rest}>
            {children}
        </div>
    );
}
