import { describe, it } from "vitest";
import { Button } from "@i-dot-ai-npm/component-library-react";
import { renderReact } from "../../../render/react";
import { expectVariantClass } from "../../../iai-variants-helpers/variants";
import { iaiButtonVariants } from "../iai-variants";

describe("Matches i.AI variant classes - Button", () => {
    for (const variant of iaiButtonVariants) {
        it(variant.name, () => {
            const html = renderReact(Button, variant.props);
            expectVariantClass(html, variant);
        });
    }
});
