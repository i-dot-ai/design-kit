import { describe, it, expect } from "vitest";
import { renderSolid } from "../../../render/solid";
import { renderedShape } from "../../../match-iai-expected-html-helpers/expected";
import DefaultExample from "@content/components/avatar/examples/default.solid";
import defaultHtml from "@content/components/avatar/examples/default.html?raw";
import IconExample from "@content/components/avatar/examples/icon.solid";
import iconHtml from "@content/components/avatar/examples/icon.html?raw";
import InverseExample from "@content/components/avatar/examples/inverse.solid";
import inverseHtml from "@content/components/avatar/examples/inverse.html?raw";
import MultipleExample from "@content/components/avatar/examples/multiple.solid";
import multipleHtml from "@content/components/avatar/examples/multiple.html?raw";
import SmallSpaceExample from "@content/components/avatar/examples/small-space.solid";
import smallSpaceHtml from "@content/components/avatar/examples/small-space.html?raw";
import SizesExample from "@content/components/avatar/examples/sizes.solid";
import sizesHtml from "@content/components/avatar/examples/sizes.html?raw";

describe("Matches i.AI expected HTML - Avatar", () => {
    it("composition", () => {
        const html = renderSolid(DefaultExample as never, {});
        expect(renderedShape(html)).toEqual(renderedShape(defaultHtml));
    });

    it("icon fallback", () => {
        const html = renderSolid(IconExample as never, {});
        expect(renderedShape(html)).toEqual(renderedShape(iconHtml));
    });

    it("inverse", () => {
        const html = renderSolid(InverseExample as never, {});
        expect(renderedShape(html)).toEqual(renderedShape(inverseHtml));
    });

    it("multiple", () => {
        const html = renderSolid(MultipleExample as never, {});
        expect(renderedShape(html)).toEqual(renderedShape(multipleHtml));
    });

    it("small space", () => {
        const html = renderSolid(SmallSpaceExample as never, {});
        expect(renderedShape(html)).toEqual(renderedShape(smallSpaceHtml));
    });

    it("sizes", () => {
        const html = renderSolid(SizesExample as never, {});
        expect(renderedShape(html)).toEqual(renderedShape(sizesHtml));
    });
});
