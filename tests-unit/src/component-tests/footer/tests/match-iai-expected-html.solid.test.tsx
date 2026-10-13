import { describe, it, expect } from "vitest";
import { renderSolid } from "../../../render/solid";
import { renderedShape } from "../../../match-iai-expected-html-helpers/expected";
import ExampleFooter from "@content/components/footer/examples/default.solid";
import expectedHtml from "@content/components/footer/examples/default.html?raw";

describe("Matches i.AI expected HTML - Footer", () => {
    it("composition", () => {
        const html = renderSolid(ExampleFooter as never, {});
        expect(renderedShape(html)).toEqual(renderedShape(expectedHtml));
    });
});
