import type { IaiVariant } from "../../iai-variants-helpers/variants";

export const iaiTableVariants: IaiVariant[] = [
    { name: "subtle", props: { subtle: true }, expectClass: "govuk-table--subtle" },
    { name: "summary", props: { summary: true }, expectClass: "govuk-table--summary" },
];
