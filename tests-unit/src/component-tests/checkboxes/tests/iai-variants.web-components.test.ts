import { describe, it } from "vitest";
import { renderWebComponent } from "../../../render/web-components";
import { expectVariantClass } from "../../../iai-variants-helpers/variants";
import { iaiCheckboxesVariants } from "../iai-variants";

describe("Matches i.AI variant classes - Checkboxes", () => {
    for (const variant of iaiCheckboxesVariants) {
        it(variant.name, () => {
            const html = renderWebComponent("iai-checkboxes", variant.props);
            expectVariantClass(html, variant);
        });
    }
});
