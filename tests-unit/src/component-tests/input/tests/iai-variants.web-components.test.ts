import { describe, it } from "vitest";
import { renderWebComponent } from "../../../render/web-components";
import { expectVariantClass } from "../../../iai-variants-helpers/variants";
import { iaiInputVariants } from "../iai-variants";

describe("Matches i.AI variant classes - Input", () => {
    for (const variant of iaiInputVariants) {
        it(variant.name, () => {
            const html = renderWebComponent("iai-input", variant.props);
            expectVariantClass(html, variant);
        });
    }
});
