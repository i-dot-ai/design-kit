import { describe, it, expect } from "vitest";
import { renderAstro } from "../../../render/astro";
import { renderedShape } from "../../../match-iai-expected-html-helpers/expected";
import ExampleFooter from "@content/components/footer/examples/default.astro";
import expectedHtml from "@content/components/footer/examples/default.html?raw";

describe("Matches i.AI expected HTML - Footer", () => {
    it("composition", async () => {
        const html = await renderAstro(ExampleFooter, {});
        expect(renderedShape(html)).toEqual(renderedShape(expectedHtml));
    });
});
