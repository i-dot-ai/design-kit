import type { ComponentPropsWithoutRef } from 'react';

type CheckboxInputProps = ComponentPropsWithoutRef<'input'> & {
    class?: string;
};

export default function CheckboxInput({ class: className, ...rest }: CheckboxInputProps) {
    const classes = ["govuk-checkboxes__input", className ?? ""].filter(Boolean).join(" ");

    return (
        <input className={classes} type="checkbox" {...rest} />
    );
}
