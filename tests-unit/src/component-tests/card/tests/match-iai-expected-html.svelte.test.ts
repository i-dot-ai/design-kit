import { describe, it, expect } from "vitest";
import { renderSvelte } from "../../../render/svelte";
import { renderedShape } from "../../../match-iai-expected-html-helpers/expected";
import ExampleCard from "@content/components/card/examples/default.svelte";
import expectedHtml from "@content/components/card/examples/default.html?raw";

describe("Matches i.AI expected HTML - Card", () => {
    it("composition", () => {
        const html = renderSvelte(ExampleCard as never, {});
        expect(renderedShape(html)).toEqual(renderedShape(expectedHtml));
    });
});
