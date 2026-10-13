import { describe, it } from "vitest";
import { Textarea } from "@i-dot-ai-npm/component-library-astro";
import { renderAstro } from "../../../render/astro";
import { expectVariantClass } from "../../../iai-variants-helpers/variants";
import { iaiTextareaVariants } from "../iai-variants";

describe("Matches i.AI variant classes - Textarea", () => {
    for (const variant of iaiTextareaVariants) {
        it(variant.name, async () => {
            const html = await renderAstro(Textarea, variant.props);
            expectVariantClass(html, variant);
        });
    }
});
