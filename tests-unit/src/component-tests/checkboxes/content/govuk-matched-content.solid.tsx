/** @jsxImportSource solid-js */
import type { JSX } from "solid-js";
import { Input, InputLabel } from "@i-dot-ai-npm/component-library-solid";

export const conditionalContent: Record<string, JSX.Element> = {
    "conditional-how-contacted": (
        <>
            <InputLabel for="context-email">Email address</InputLabel>
            <Input id="context-email" name="context-email" class="govuk-!-width-one-third" />
        </>
    ),
    "conditional-how-contacted-2": (
        <>
            <InputLabel for="contact-phone">Phone number</InputLabel>
            <Input id="contact-phone" name="contact-phone" class="govuk-!-width-one-third" />
        </>
    ),
    "conditional-how-contacted-3": (
        <>
            <InputLabel for="contact-text-message">Mobile phone number</InputLabel>
            <Input id="contact-text-message" name="contact-text-message" class="govuk-!-width-one-third" />
        </>
    ),
};
