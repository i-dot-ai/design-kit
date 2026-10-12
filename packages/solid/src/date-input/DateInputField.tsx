/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type DateInputFieldProps = JSX.IntrinsicElements['input'] & {
    width?: 2 | 3 | 4;
    class?: string;
};

export default function DateInputField(props: DateInputFieldProps) {
    const [local, rest] = splitProps(props, ["width", "class"]);
    const classes = () =>
        [
            "govuk-input govuk-date-input__input",
            (local.width ? { 2: "govuk-input--width-2", 3: "govuk-input--width-3", 4: "govuk-input--width-4" }[local.width] : ""),
            local.class ?? "",
        ]
            .filter(Boolean)
            .join(" ");

    return (
        <input class={classes()} type="text" inputmode="numeric" {...rest} />
    );
}
