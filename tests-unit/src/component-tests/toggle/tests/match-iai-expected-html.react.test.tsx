import { describe, it, expect } from "vitest";
import { renderReact } from "../../../render/react";
import { renderedShape } from "../../../match-iai-expected-html-helpers/expected";
import ExampleToggle from "@content/components/toggle/examples/default.react";
import expectedHtml from "@content/components/toggle/examples/default.html?raw";

describe("Matches i.AI expected HTML - Toggle", () => {
    it("composition", () => {
        const html = renderReact(ExampleToggle, {});
        expect(renderedShape(html)).toEqual(renderedShape(expectedHtml));
    });
});
