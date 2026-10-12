import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type SummaryListKeyProps = ComponentPropsWithoutRef<'dt'> & {
    class?: string;
    children?: ReactNode;
};

export default function SummaryListKey({ class: className, children, ...rest }: SummaryListKeyProps) {
    const classes = ["govuk-summary-list__key", className ?? ""].filter(Boolean).join(" ");

    return (
        <dt className={classes} {...rest}>
            {children ?? ""}
        </dt>
    );
}
