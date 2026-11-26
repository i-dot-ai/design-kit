import { describe, it, expect } from "vitest";
import { Avatar } from "@i-dot-ai-npm/component-library-svelte";
import { renderSvelte } from "../../../render/svelte";
import { expectVariantClass } from "../../../iai-variants-helpers/variants";
import { iaiAvatarVariants } from "../iai-variants";

describe("Matches i.AI variant classes - Avatar", () => {
    for (const variant of iaiAvatarVariants) {
        it(variant.name, () => {
            const html = renderSvelte(Avatar, variant.props);
            expectVariantClass(html, variant);
        });
    }

    it("whitespace-only fullName shows the fallback icon", () => {
        expect(renderSvelte(Avatar, { fullName: "  " })).toContain("<svg");
    });
});
