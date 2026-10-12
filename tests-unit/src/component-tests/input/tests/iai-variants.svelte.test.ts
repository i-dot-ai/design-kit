import { describe, it } from "vitest";
import { Input } from "@i-dot-ai-npm/component-library-svelte";
import { renderSvelte } from "../../../render/svelte";
import { expectVariantClass } from "../../../iai-variants-helpers/variants";
import { iaiInputVariants } from "../iai-variants";

describe("Matches i.AI variant classes - Input", () => {
    for (const variant of iaiInputVariants) {
        it(variant.name, () => {
            const html = renderSvelte(Input, variant.props);
            expectVariantClass(html, variant);
        });
    }
});
