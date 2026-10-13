import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type InputLabelProps = ComponentPropsWithoutRef<'label'> & {
    size?: "small" | "medium" | "large" | "xl";
    class?: string;
    children?: ReactNode;
};

export default function InputLabel({ size, class: className, children, ...rest }: InputLabelProps) {
    const classes = [
        "govuk-label",
        (size ? { "small": "govuk-label--s", "medium": "govuk-label--m", "large": "govuk-label--l", "xl": "govuk-label--xl" }[size] : ""),
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <label className={classes} {...rest}>
            {children ?? ""}
        </label>
    );
}
