import { describe, it, expect } from "vitest";
import { renderAstro } from "../../../render/astro";
import { renderedShape } from "../../../match-iai-expected-html-helpers/expected";
import ExampleToggle from "@content/components/toggle/examples/default.astro";
import expectedHtml from "@content/components/toggle/examples/default.html?raw";

describe("Matches i.AI expected HTML - Toggle", () => {
    it("composition", async () => {
        const html = await renderAstro(ExampleToggle, {});
        expect(renderedShape(html)).toEqual(renderedShape(expectedHtml));
    });
});
