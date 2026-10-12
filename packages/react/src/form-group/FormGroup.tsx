import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type FormGroupProps = ComponentPropsWithoutRef<'div'> & {
    inline?: boolean;
    class?: string;
    children?: ReactNode;
};

export default function FormGroup({ inline, class: className, children, ...rest }: FormGroupProps) {
    const classes = [
        "govuk-form-group",
        inline ? "govuk-form-group--inline" : "",
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={classes} {...rest}>
            {children ?? ""}
        </div>
    );
}
