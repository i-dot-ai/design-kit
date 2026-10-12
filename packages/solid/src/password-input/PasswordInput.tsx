/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type PasswordInputProps = JSX.IntrinsicElements['input'] & {
    class?: string;
    children?: JSX.Element;
};

export default function PasswordInput(props: PasswordInputProps) {
    const [local, rest] = splitProps(props, ["class", "children"]);
    const classes = () =>
        ["govuk-input govuk-password-input__input govuk-js-password-input-input", local.class ?? ""].filter(Boolean).join(" ");

    return (
        <div class="govuk-input__wrapper govuk-password-input__wrapper">
            <input class={classes()} type="password" spellcheck="false" autocomplete="current-password" autocapitalize="none" {...rest} />
            <button class="govuk-button govuk-button--secondary govuk-password-input__toggle govuk-js-password-input-toggle" type="button" data-module="govuk-button" aria-label="Show password" hidden>
                {local.children ?? "Show"}
            </button>
        </div>
    );
}
