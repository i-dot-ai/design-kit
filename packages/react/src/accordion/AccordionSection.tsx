import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type AccordionSectionProps = ComponentPropsWithoutRef<'div'> & {
    class?: string;
    children?: ReactNode;
};

export default function AccordionSection({ class: className, children, ...rest }: AccordionSectionProps) {
    const classes = ["govuk-accordion__section", className ?? ""].filter(Boolean).join(" ");

    return (
        <div className={classes} {...rest}>
            {children ?? ""}
        </div>
    );
}
