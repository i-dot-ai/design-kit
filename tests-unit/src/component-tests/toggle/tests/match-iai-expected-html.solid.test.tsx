import { describe, it, expect } from "vitest";
import { renderSolid } from "../../../render/solid";
import { renderedShape } from "../../../match-iai-expected-html-helpers/expected";
import ExampleToggle from "@content/components/toggle/examples/default.solid";
import expectedHtml from "@content/components/toggle/examples/default.html?raw";

describe("Matches i.AI expected HTML - Toggle", () => {
    it("composition", () => {
        const html = renderSolid(ExampleToggle as never, {});
        expect(renderedShape(html)).toEqual(renderedShape(expectedHtml));
    });
});
