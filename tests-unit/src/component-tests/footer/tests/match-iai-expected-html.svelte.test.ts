import { describe, it, expect } from "vitest";
import { renderSvelte } from "../../../render/svelte";
import { renderedShape } from "../../../match-iai-expected-html-helpers/expected";
import ExampleFooter from "@content/components/footer/examples/default.svelte";
import expectedHtml from "@content/components/footer/examples/default.html?raw";

describe("Matches i.AI expected HTML - Footer", () => {
    it("composition", () => {
        const html = renderSvelte(ExampleFooter as never, {});
        expect(renderedShape(html)).toEqual(renderedShape(expectedHtml));
    });
});
