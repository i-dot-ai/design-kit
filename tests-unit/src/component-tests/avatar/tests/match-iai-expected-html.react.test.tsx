import { describe, it, expect } from "vitest";
import { renderReact } from "../../../render/react";
import { renderedShape } from "../../../match-iai-expected-html-helpers/expected";
import DefaultExample from "@content/components/avatar/examples/default.react";
import defaultHtml from "@content/components/avatar/examples/default.html?raw";
import IconExample from "@content/components/avatar/examples/icon.react";
import iconHtml from "@content/components/avatar/examples/icon.html?raw";
import InverseExample from "@content/components/avatar/examples/inverse.react";
import inverseHtml from "@content/components/avatar/examples/inverse.html?raw";
import MultipleExample from "@content/components/avatar/examples/multiple.react";
import multipleHtml from "@content/components/avatar/examples/multiple.html?raw";
import SmallSpaceExample from "@content/components/avatar/examples/small-space.react";
import smallSpaceHtml from "@content/components/avatar/examples/small-space.html?raw";
import SizesExample from "@content/components/avatar/examples/sizes.react";
import sizesHtml from "@content/components/avatar/examples/sizes.html?raw";

describe("Matches i.AI expected HTML - Avatar", () => {
    it("composition", () => {
        const html = renderReact(DefaultExample, {});
        expect(renderedShape(html)).toEqual(renderedShape(defaultHtml));
    });

    it("icon fallback", () => {
        const html = renderReact(IconExample, {});
        expect(renderedShape(html)).toEqual(renderedShape(iconHtml));
    });

    it("inverse", () => {
        const html = renderReact(InverseExample, {});
        expect(renderedShape(html)).toEqual(renderedShape(inverseHtml));
    });

    it("multiple", () => {
        const html = renderReact(MultipleExample, {});
        expect(renderedShape(html)).toEqual(renderedShape(multipleHtml));
    });

    it("small space", () => {
        const html = renderReact(SmallSpaceExample, {});
        expect(renderedShape(html)).toEqual(renderedShape(smallSpaceHtml));
    });

    it("sizes", () => {
        const html = renderReact(SizesExample, {});
        expect(renderedShape(html)).toEqual(renderedShape(sizesHtml));
    });
});
