import { describe, it } from "vitest";
import { Table, TableCell, TableSearchAndFilter } from "@i-dot-ai-npm/component-library-react";
import { renderReact } from "../../../render/react";
import { expectVariantClass } from "../../../iai-variants-helpers/variants";
import { iaiTableCellVariants, iaiTableSearchAndFilterVariants, iaiTableVariants } from "../iai-variants";

describe("Matches i.AI variant classes - Table", () => {
    for (const variant of iaiTableVariants) {
        it(variant.name, () => {
            const html = renderReact(Table, variant.props);
            expectVariantClass(html, variant);
        });
    }
});

describe("Matches i.AI variant classes - TableCell", () => {
    for (const variant of iaiTableCellVariants) {
        it(variant.name, () => {
            const html = renderReact(TableCell, variant.props);
            expectVariantClass(html, variant);
        });
    }
});

describe("Matches i.AI variant classes - TableSearchAndFilter", () => {
    for (const variant of iaiTableSearchAndFilterVariants) {
        it(variant.name, () => {
            const html = renderReact(TableSearchAndFilter, variant.props);
            expectVariantClass(html, variant);
        });
    }
});
