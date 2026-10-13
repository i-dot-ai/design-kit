import type { ComponentPropsWithoutRef } from 'react';

type InputProps = Omit<ComponentPropsWithoutRef<'input'>, 'width'> & {
    error?: boolean;
    extraLetterSpacing?: boolean;
    subtle?: boolean;
    width?: 2 | 3 | 4 | 5 | 10 | 20 | 30;
    class?: string;
};

export default function Input({ error, extraLetterSpacing, subtle, width, class: className, ...rest }: InputProps) {
    const classes = [
        "govuk-input",
        error ? "govuk-input--error" : "",
        extraLetterSpacing ? "govuk-input--extra-letter-spacing" : "",
        subtle ? "govuk-input--subtle" : "",
        (width ? { 2: "govuk-input--width-2", 3: "govuk-input--width-3", 4: "govuk-input--width-4", 5: "govuk-input--width-5", 10: "govuk-input--width-10", 20: "govuk-input--width-20", 30: "govuk-input--width-30" }[width] : ""),
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <input className={classes} type="text" {...rest} />
    );
}
