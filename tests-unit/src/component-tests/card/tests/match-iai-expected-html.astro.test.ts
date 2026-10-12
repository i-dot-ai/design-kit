import { describe, it, expect } from "vitest";
import { renderAstro } from "../../../render/astro";
import { renderedShape } from "../../../match-iai-expected-html-helpers/expected";
import ExampleCard from "@content/components/card/examples/default.astro";
import expectedHtml from "@content/components/card/examples/default.html?raw";

describe("Matches i.AI expected HTML - Card", () => {
    it("composition", async () => {
        const html = await renderAstro(ExampleCard, {});
        expect(renderedShape(html)).toEqual(renderedShape(expectedHtml));
    });
});
