import { describe, it } from "vitest";
import { Select } from "@i-dot-ai-npm/component-library-astro";
import { renderAstro } from "../../../render/astro";
import { expectVariantClass } from "../../../iai-variants-helpers/variants";
import { iaiSelectVariants } from "../iai-variants";

describe("Matches i.AI variant classes - Select", () => {
    for (const variant of iaiSelectVariants) {
        it(variant.name, async () => {
            const html = await renderAstro(Select, variant.props);
            expectVariantClass(html, variant);
        });
    }
});
