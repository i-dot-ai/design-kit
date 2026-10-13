import { describe, it } from "vitest";
import { Card } from "@i-dot-ai-npm/component-library-svelte";
import { renderSvelte } from "../../../render/svelte";
import { expectVariantClass } from "../../../iai-variants-helpers/variants";
import { iaiCardVariants } from "../iai-variants";

describe("Matches i.AI variant classes - Card", () => {
    for (const variant of iaiCardVariants) {
        it(variant.name, () => {
            const html = renderSvelte(Card, variant.props);
            expectVariantClass(html, variant);
        });
    }
});
