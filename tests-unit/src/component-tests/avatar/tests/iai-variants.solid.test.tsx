import { describe, it, expect } from "vitest";
import { Avatar } from "@i-dot-ai-npm/component-library-solid";
import { renderSolid } from "../../../render/solid";
import { expectVariantClass } from "../../../iai-variants-helpers/variants";
import { iaiAvatarVariants } from "../iai-variants";

describe("Matches i.AI variant classes - Avatar", () => {
    for (const variant of iaiAvatarVariants) {
        it(variant.name, () => {
            const html = renderSolid(Avatar, variant.props);
            expectVariantClass(html, variant);
        });
    }

    it("whitespace-only fullName shows the fallback icon", () => {
        expect(renderSolid(Avatar, { fullName: "  " })).toContain("<svg");
    });
});
