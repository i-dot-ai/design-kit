import { describe, it } from "vitest";
import { Textarea } from "@i-dot-ai-npm/component-library-svelte";
import { renderSvelte } from "../../../render/svelte";
import { expectVariantClass } from "../../../iai-variants-helpers/variants";
import { iaiTextareaVariants } from "../iai-variants";

describe("Matches i.AI variant classes - Textarea", () => {
    for (const variant of iaiTextareaVariants) {
        it(variant.name, () => {
            const html = renderSvelte(Textarea, variant.props);
            expectVariantClass(html, variant);
        });
    }
});
