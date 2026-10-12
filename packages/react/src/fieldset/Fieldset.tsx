import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type FieldsetProps = ComponentPropsWithoutRef<'fieldset'> & {
    class?: string;
    children?: ReactNode;
};

export default function Fieldset({ class: className, children, ...rest }: FieldsetProps) {
    const classes = ["govuk-fieldset", className ?? ""].filter(Boolean).join(" ");

    return (
        <fieldset className={classes} {...rest}>
            {children ?? ""}
        </fieldset>
    );
}
