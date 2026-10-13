import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type AccordionSectionHeadingProps = ComponentPropsWithoutRef<'span'> & {
    class?: string;
    children?: ReactNode;
};

export default function AccordionSectionHeading({ class: className, children, ...rest }: AccordionSectionHeadingProps) {
    const classes = ["govuk-accordion__section-button", className ?? ""].filter(Boolean).join(" ");

    return (
        <h2 className="govuk-accordion__section-heading">
            <span className={classes} {...rest}>
                {children ?? ""}
            </span>
        </h2>
    );
}
