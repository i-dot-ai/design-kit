import { describe, it } from "vitest";
import { renderWebComponent } from "../../../render/web-components";
import { expectVariantClass } from "../../../iai-variants-helpers/variants";
import { iaiTableCellVariants, iaiTableSearchAndFilterVariants, iaiTableVariants } from "../iai-variants";

describe("Matches i.AI variant classes - Table", () => {
    for (const variant of iaiTableVariants) {
        it(variant.name, () => {
            const html = renderWebComponent("iai-table", variant.props);
            expectVariantClass(html, variant);
        });
    }
});

describe("Matches i.AI variant classes - TableCell", () => {
    for (const variant of iaiTableCellVariants) {
        it(variant.name, () => {
            const html = renderWebComponent("iai-table-cell", variant.props);
            expectVariantClass(html, variant);
        });
    }
});

describe("Matches i.AI variant classes - TableSearchAndFilter", () => {
    for (const variant of iaiTableSearchAndFilterVariants) {
        it(variant.name, () => {
            const html = renderWebComponent("iai-table-search-and-filter", variant.props);
            expectVariantClass(html, variant);
        });
    }
});
