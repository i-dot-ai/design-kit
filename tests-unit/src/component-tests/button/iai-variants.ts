import type { IaiVariant } from "../../iai-variants-helpers/variants";

export const iaiButtonVariants: IaiVariant[] = [
    { name: "tertiary", props: { tertiary: true }, expectClass: "govuk-button--tertiary" },
    { name: "small", props: { small: true }, expectClass: "govuk-button--small" },
];
