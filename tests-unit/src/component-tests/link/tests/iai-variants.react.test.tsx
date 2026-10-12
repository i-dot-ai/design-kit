import { describe, it } from "vitest";
import { Link } from "@i-dot-ai-npm/component-library-react";
import { renderReact } from "../../../render/react";
import { expectVariantClass } from "../../../iai-variants-helpers/variants";
import { iaiLinkVariants } from "../iai-variants";

describe("Matches i.AI variant classes - Link", () => {
    for (const variant of iaiLinkVariants) {
        it(variant.name, () => {
            const html = renderReact(Link, variant.props);
            expectVariantClass(html, variant);
        });
    }
});
