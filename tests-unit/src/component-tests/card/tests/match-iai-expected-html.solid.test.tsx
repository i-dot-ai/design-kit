import { describe, it, expect } from "vitest";
import { renderSolid } from "../../../render/solid";
import { renderedShape } from "../../../match-iai-expected-html-helpers/expected";
import ExampleCard from "@content/components/card/examples/default.solid";
import expectedHtml from "@content/components/card/examples/default.html?raw";

describe("Matches i.AI expected HTML - Card", () => {
    it("composition", () => {
        const html = renderSolid(ExampleCard as never, {});
        expect(renderedShape(html)).toEqual(renderedShape(expectedHtml));
    });
});
