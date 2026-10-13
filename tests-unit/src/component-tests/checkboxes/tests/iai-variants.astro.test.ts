import { describe, it } from "vitest";
import { Checkboxes } from "@i-dot-ai-npm/component-library-astro";
import { renderAstro } from "../../../render/astro";
import { expectVariantClass } from "../../../iai-variants-helpers/variants";
import { iaiCheckboxesVariants } from "../iai-variants";

describe("Matches i.AI variant classes - Checkboxes", () => {
    for (const variant of iaiCheckboxesVariants) {
        it(variant.name, async () => {
            const html = await renderAstro(Checkboxes, variant.props);
            expectVariantClass(html, variant);
        });
    }
});
