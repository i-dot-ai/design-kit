import { describe, it } from "vitest";
import { renderWebComponent } from "../../../render/web-components";
import { expectVariantClass } from "../../../iai-variants-helpers/variants";
import { iaiSelectVariants } from "../iai-variants";

describe("Matches i.AI variant classes - Select", () => {
    for (const variant of iaiSelectVariants) {
        it(variant.name, () => {
            const html = renderWebComponent("iai-select", variant.props);
            expectVariantClass(html, variant);
        });
    }
});
