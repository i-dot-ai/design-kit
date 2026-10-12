import { describe, it } from "vitest";
import { Table } from "@i-dot-ai-npm/component-library-astro";
import { renderAstro } from "../../../render/astro";
import { expectVariantClass } from "../../../iai-variants-helpers/variants";
import { iaiTableVariants } from "../iai-variants";

describe("Matches i.AI variant classes - Table", () => {
    for (const variant of iaiTableVariants) {
        it(variant.name, async () => {
            const html = await renderAstro(Table, variant.props);
            expectVariantClass(html, variant);
        });
    }
});
