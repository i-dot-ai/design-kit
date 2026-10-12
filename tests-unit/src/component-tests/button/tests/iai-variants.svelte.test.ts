import { describe, it } from "vitest";
import { Button } from "@i-dot-ai-npm/component-library-svelte";
import { renderSvelte } from "../../../render/svelte";
import { expectVariantClass } from "../../../iai-variants-helpers/variants";
import { iaiButtonVariants } from "../iai-variants";

describe("Matches i.AI variant classes - Button", () => {
    for (const variant of iaiButtonVariants) {
        it(variant.name, () => {
            const html = renderSvelte(Button, variant.props);
            expectVariantClass(html, variant);
        });
    }
});
