import { describe, it } from "vitest";
import { renderWebComponent } from "../../../render/web-components";
import { expectVariantClass } from "../../../iai-variants-helpers/variants";
import { iaiTableVariants } from "../iai-variants";

describe("Matches i.AI variant classes - Table", () => {
    for (const variant of iaiTableVariants) {
        it(variant.name, () => {
            const html = renderWebComponent("iai-table", variant.props);
            expectVariantClass(html, variant);
        });
    }
});
