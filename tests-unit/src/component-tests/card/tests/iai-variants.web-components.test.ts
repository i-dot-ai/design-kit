import { describe, it } from "vitest";
import { renderWebComponent } from "../../../render/web-components";
import { expectVariantClass } from "../../../iai-variants-helpers/variants";
import { iaiCardVariants } from "../iai-variants";

describe("Matches i.AI variant classes - Card", () => {
    for (const variant of iaiCardVariants) {
        it(variant.name, () => {
            const html = renderWebComponent("iai-card", variant.props);
            expectVariantClass(html, variant);
        });
    }
});
