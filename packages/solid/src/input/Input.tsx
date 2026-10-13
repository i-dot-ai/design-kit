/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type InputProps = Omit<JSX.IntrinsicElements['input'], 'width'> & {
    error?: boolean;
    extraLetterSpacing?: boolean;
    subtle?: boolean;
    width?: 2 | 3 | 4 | 5 | 10 | 20 | 30;
    class?: string;
};

export default function Input(props: InputProps) {
    const [local, rest] = splitProps(props, ["error", "extraLetterSpacing", "subtle", "width", "class"]);
    const classes = () =>
        [
            "govuk-input",
            local.error ? "govuk-input--error" : "",
            local.extraLetterSpacing ? "govuk-input--extra-letter-spacing" : "",
            local.subtle ? "govuk-input--subtle" : "",
            (local.width ? { 2: "govuk-input--width-2", 3: "govuk-input--width-3", 4: "govuk-input--width-4", 5: "govuk-input--width-5", 10: "govuk-input--width-10", 20: "govuk-input--width-20", 30: "govuk-input--width-30" }[local.width] : ""),
            local.class ?? "",
        ]
            .filter(Boolean)
            .join(" ");

    return (
        <input class={classes()} type="text" {...rest} />
    );
}
