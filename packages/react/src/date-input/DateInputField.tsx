import type { ComponentPropsWithoutRef } from 'react';

type DateInputFieldProps = Omit<ComponentPropsWithoutRef<'input'>, 'width'> & {
    width?: 2 | 3 | 4;
    class?: string;
};

export default function DateInputField({ width, class: className, ...rest }: DateInputFieldProps) {
    const classes = [
        "govuk-input govuk-date-input__input",
        (width ? { 2: "govuk-input--width-2", 3: "govuk-input--width-3", 4: "govuk-input--width-4" }[width] : ""),
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <input className={classes} type="text" inputMode="numeric" {...rest} />
    );
}
