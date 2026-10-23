import { describe, it } from "vitest";
import "@i-dot-ai-npm/component-library-web-components";
import { renderWebComponent } from "../../../render/web-components";
import { expectVariantClass } from "../../../iai-variants-helpers/variants";
import { iaiButtonVariants } from "../iai-variants";

describe("Matches i.AI variant classes - Button", () => {
    for (const variant of iaiButtonVariants) {
        it(variant.name, () => {
            const html = renderWebComponent("iai-button", variant.props);
            expectVariantClass(html, variant);
        });
    }
});
