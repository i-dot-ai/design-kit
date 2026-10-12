import { describe, it } from "vitest";
import { Link } from "@i-dot-ai-npm/component-library-astro";
import { renderAstro } from "../../../render/astro";
import { expectVariantClass } from "../../../iai-variants-helpers/variants";
import { iaiLinkVariants } from "../iai-variants";

describe("Matches i.AI variant classes - Link", () => {
    for (const variant of iaiLinkVariants) {
        it(variant.name, async () => {
            const html = await renderAstro(Link, variant.props);
            expectVariantClass(html, variant);
        });
    }
});
