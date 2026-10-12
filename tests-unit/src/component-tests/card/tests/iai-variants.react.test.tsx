import { describe, it } from "vitest";
import { Card } from "@i-dot-ai-npm/component-library-react";
import { renderReact } from "../../../render/react";
import { expectVariantClass } from "../../../iai-variants-helpers/variants";
import { iaiCardVariants } from "../iai-variants";

describe("Matches i.AI variant classes - Card", () => {
    for (const variant of iaiCardVariants) {
        it(variant.name, () => {
            const html = renderReact(Card, variant.props);
            expectVariantClass(html, variant);
        });
    }
});
