import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type AccordionSectionHeaderProps = ComponentPropsWithoutRef<'div'> & {
    class?: string;
    children?: ReactNode;
};

export default function AccordionSectionHeader({ class: className, children, ...rest }: AccordionSectionHeaderProps) {
    const classes = ["govuk-accordion__section-header", className ?? ""].filter(Boolean).join(" ");

    return (
        <div className={classes} {...rest}>
            {children ?? ""}
        </div>
    );
}
