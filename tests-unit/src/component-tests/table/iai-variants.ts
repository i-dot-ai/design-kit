import type { IaiVariant } from "../../iai-variants-helpers/variants";

export const iaiTableVariants: IaiVariant[] = [
    { name: "subtle", props: { subtle: true }, expectClass: "govuk-table--subtle" },
    { name: "summary", props: { summary: true }, expectClass: "govuk-table--summary" },
];

// noWrap also works for web components: HTML attribute names are lowercased to "nowrap".
export const iaiTableCellVariants: IaiVariant[] = [
    { name: "stretch", props: { stretch: true }, expectClass: "govuk-table__cell--stretch" },
    { name: "no-wrap", props: { noWrap: true }, expectClass: "govuk-table__cell--no-wrap" },
    { name: "small", props: { small: true }, expectClass: "govuk-table__cell--small" },
];

export const iaiTableSearchAndFilterVariants: IaiVariant[] = [
    { name: "wrapper", props: {}, expectClass: "govuk-table__search-and-filter-wrapper" },
];
