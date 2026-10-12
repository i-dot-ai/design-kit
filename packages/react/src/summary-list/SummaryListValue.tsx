import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type SummaryListValueProps = ComponentPropsWithoutRef<'dd'> & {
    class?: string;
    children?: ReactNode;
};

export default function SummaryListValue({ class: className, children, ...rest }: SummaryListValueProps) {
    const classes = ["govuk-summary-list__value", className ?? ""].filter(Boolean).join(" ");

    return (
        <dd className={classes} {...rest}>
            {children ?? ""}
        </dd>
    );
}
