import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type LabelProps = ComponentPropsWithoutRef<'label'> & {
    size?: "small" | "medium" | "large" | "xl";
    isPageHeading?: boolean;
    class?: string;
    children?: ReactNode;
};

export default function Label({ size, isPageHeading = false, class: className, children, ...rest }: LabelProps) {
    const classes = [
        "govuk-label",
        (size ? { "small": "govuk-label--s", "medium": "govuk-label--m", "large": "govuk-label--l", "xl": "govuk-label--xl" }[size] : ""),
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    const label = (
        <label className={classes} {...rest}>
            {children ?? ""}
        </label>
    );

    if (isPageHeading) {
        return <h1 className="govuk-label-wrapper">{label}</h1>;
    }

    return label;
}
