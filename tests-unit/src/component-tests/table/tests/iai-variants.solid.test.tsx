import { describe, it } from "vitest";
import { Table } from "@i-dot-ai-npm/component-library-solid";
import { renderSolid } from "../../../render/solid";
import { expectVariantClass } from "../../../iai-variants-helpers/variants";
import { iaiTableVariants } from "../iai-variants";

describe("Matches i.AI variant classes - Table", () => {
    for (const variant of iaiTableVariants) {
        it(variant.name, () => {
            const html = renderSolid(Table, variant.props);
            expectVariantClass(html, variant);
        });
    }
});
