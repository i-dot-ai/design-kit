import { describe, it } from "vitest";
import { Link } from "@i-dot-ai-npm/component-library-solid";
import { renderSolid } from "../../../render/solid";
import { expectVariantClass } from "../../../iai-variants-helpers/variants";
import { iaiLinkVariants } from "../iai-variants";

describe("Matches i.AI variant classes - Link", () => {
    for (const variant of iaiLinkVariants) {
        it(variant.name, () => {
            const html = renderSolid(Link, variant.props);
            expectVariantClass(html, variant);
        });
    }
});
