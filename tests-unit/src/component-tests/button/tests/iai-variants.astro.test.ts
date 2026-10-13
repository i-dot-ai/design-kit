import { describe, it } from "vitest";
import { Button } from "@i-dot-ai-npm/component-library-astro";
import { renderAstro } from "../../../render/astro";
import { expectVariantClass } from "../../../iai-variants-helpers/variants";
import { iaiButtonVariants } from "../iai-variants";

describe("Matches i.AI variant classes - Button", () => {
    for (const variant of iaiButtonVariants) {
        it(variant.name, async () => {
            const html = await renderAstro(Button, variant.props);
            expectVariantClass(html, variant);
        });
    }
});
