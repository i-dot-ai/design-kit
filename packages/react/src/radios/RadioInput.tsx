import type { ComponentPropsWithoutRef } from 'react';

type RadioInputProps = ComponentPropsWithoutRef<'input'> & {
    class?: string;
};

export default function RadioInput({ class: className, ...rest }: RadioInputProps) {
    const classes = ["govuk-radios__input", className ?? ""].filter(Boolean).join(" ");

    return (
        <input className={classes} type="radio" {...rest} />
    );
}
