import { describe, it } from "vitest";
import { Select } from "@i-dot-ai-npm/component-library-react";
import { renderReact } from "../../../render/react";
import { expectVariantClass } from "../../../iai-variants-helpers/variants";
import { iaiSelectVariants } from "../iai-variants";

describe("Matches i.AI variant classes - Select", () => {
    for (const variant of iaiSelectVariants) {
        it(variant.name, () => {
            const html = renderReact(Select, variant.props);
            expectVariantClass(html, variant);
        });
    }
});
