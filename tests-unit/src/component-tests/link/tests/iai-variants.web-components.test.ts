import { describe, it } from "vitest";
import "@i-dot-ai-npm/component-library-web-components";
import { renderWebComponent } from "../../../render/web-components";
import { expectVariantClass } from "../../../iai-variants-helpers/variants";
import { iaiLinkVariants } from "../iai-variants";

describe("Matches i.AI variant classes - Link", () => {
    for (const variant of iaiLinkVariants) {
        it(variant.name, () => {
            const html = renderWebComponent("iai-link", variant.props);
            expectVariantClass(html, variant);
        });
    }
});
