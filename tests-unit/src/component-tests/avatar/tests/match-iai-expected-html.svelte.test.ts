import { describe, it, expect } from "vitest";
import { renderSvelte } from "../../../render/svelte";
import { renderedShape } from "../../../match-iai-expected-html-helpers/expected";
import DefaultExample from "@content/components/avatar/examples/default.svelte";
import defaultHtml from "@content/components/avatar/examples/default.html?raw";
import IconExample from "@content/components/avatar/examples/icon.svelte";
import iconHtml from "@content/components/avatar/examples/icon.html?raw";
import InverseExample from "@content/components/avatar/examples/inverse.svelte";
import inverseHtml from "@content/components/avatar/examples/inverse.html?raw";
import MultipleExample from "@content/components/avatar/examples/multiple.svelte";
import multipleHtml from "@content/components/avatar/examples/multiple.html?raw";
import SmallSpaceExample from "@content/components/avatar/examples/small-space.svelte";
import smallSpaceHtml from "@content/components/avatar/examples/small-space.html?raw";
import SizesExample from "@content/components/avatar/examples/sizes.svelte";
import sizesHtml from "@content/components/avatar/examples/sizes.html?raw";

describe("Matches i.AI expected HTML - Avatar", () => {
    it("composition", () => {
        const html = renderSvelte(DefaultExample as never, {});
        expect(renderedShape(html)).toEqual(renderedShape(defaultHtml));
    });

    it("icon fallback", () => {
        const html = renderSvelte(IconExample as never, {});
        expect(renderedShape(html)).toEqual(renderedShape(iconHtml));
    });

    it("inverse", () => {
        const html = renderSvelte(InverseExample as never, {});
        expect(renderedShape(html)).toEqual(renderedShape(inverseHtml));
    });

    it("multiple", () => {
        const html = renderSvelte(MultipleExample as never, {});
        expect(renderedShape(html)).toEqual(renderedShape(multipleHtml));
    });

    it("small space", () => {
        const html = renderSvelte(SmallSpaceExample as never, {});
        expect(renderedShape(html)).toEqual(renderedShape(smallSpaceHtml));
    });

    it("sizes", () => {
        const html = renderSvelte(SizesExample as never, {});
        expect(renderedShape(html)).toEqual(renderedShape(sizesHtml));
    });
});
