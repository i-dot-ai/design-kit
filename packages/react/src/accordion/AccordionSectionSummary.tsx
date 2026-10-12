import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type AccordionSectionSummaryProps = ComponentPropsWithoutRef<'div'> & {
    class?: string;
    children?: ReactNode;
};

export default function AccordionSectionSummary({ class: className, children, ...rest }: AccordionSectionSummaryProps) {
    const classes = ["govuk-accordion__section-summary govuk-body", className ?? ""].filter(Boolean).join(" ");

    return (
        <div className={classes} {...rest}>
            {children ?? ""}
        </div>
    );
}
