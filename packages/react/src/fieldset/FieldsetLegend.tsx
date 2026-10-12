import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type FieldsetLegendProps = ComponentPropsWithoutRef<'legend'> & {
    size?: "small" | "medium" | "large" | "xl";
    isPageHeading?: boolean;
    class?: string;
    children?: ReactNode;
};

export default function FieldsetLegend({ size, isPageHeading, class: className, children, ...rest }: FieldsetLegendProps) {
    const classes = [
        "govuk-fieldset__legend",
        (size ? { "small": "govuk-fieldset__legend--s", "medium": "govuk-fieldset__legend--m", "large": "govuk-fieldset__legend--l", "xl": "govuk-fieldset__legend--xl" }[size] : ""),
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <legend className={classes} {...rest}>
            {isPageHeading
                ? <h1 className="govuk-fieldset__heading">{children ?? ""}</h1>
                : children ?? ""}
        </legend>
    );
}
