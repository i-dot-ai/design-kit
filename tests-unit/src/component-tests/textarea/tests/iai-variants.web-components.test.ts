import { describe, it } from "vitest";
import { renderWebComponent } from "../../../render/web-components";
import { expectVariantClass } from "../../../iai-variants-helpers/variants";
import { iaiTextareaVariants } from "../iai-variants";

describe("Matches i.AI variant classes - Textarea", () => {
    for (const variant of iaiTextareaVariants) {
        it(variant.name, () => {
            const html = renderWebComponent("iai-textarea", variant.props);
            expectVariantClass(html, variant);
        });
    }
});
