import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type AccordionSectionContentProps = ComponentPropsWithoutRef<'div'> & {
    class?: string;
    children?: ReactNode;
};

export default function AccordionSectionContent({ class: className, children, ...rest }: AccordionSectionContentProps) {
    const classes = ["govuk-accordion__section-content", className ?? ""].filter(Boolean).join(" ");

    return (
        <div className={classes} {...rest}>
            {children ?? ""}
        </div>
    );
}
