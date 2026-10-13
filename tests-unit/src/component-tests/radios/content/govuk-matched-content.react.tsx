import type { ReactNode } from "react";
import { Input, InputLabel } from "@i-dot-ai-npm/component-library-react";

export const conditionalContent: Record<string, ReactNode> = {
    "conditional-how-contacted": (
        <>
            <InputLabel htmlFor="context-email">Email address</InputLabel>
            <Input id="context-email" name="context-email" class="govuk-!-width-one-third" />
        </>
    ),
    "conditional-how-contacted-2": (
        <>
            <InputLabel htmlFor="contact-phone">Phone number</InputLabel>
            <Input id="contact-phone" name="contact-phone" class="govuk-!-width-one-third" />
        </>
    ),
    "conditional-how-contacted-3": (
        <>
            <InputLabel htmlFor="contact-text-message">Mobile phone number</InputLabel>
            <Input id="contact-text-message" name="contact-text-message" class="govuk-!-width-one-third" />
        </>
    ),
};
