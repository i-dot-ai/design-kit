import { describe, it } from "vitest";
import { Card } from "@i-dot-ai-npm/component-library-astro";
import { renderAstro } from "../../../render/astro";
import { expectVariantClass } from "../../../iai-variants-helpers/variants";
import { iaiCardVariants } from "../iai-variants";

describe("Matches i.AI variant classes - Card", () => {
    for (const variant of iaiCardVariants) {
        it(variant.name, async () => {
            const html = await renderAstro(Card, variant.props);
            expectVariantClass(html, variant);
        });
    }
});
