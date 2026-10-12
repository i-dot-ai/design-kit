import { describe, it, expect } from "vitest";
import { renderReact } from "../../../render/react";
import { renderedShape } from "../../../match-iai-expected-html-helpers/expected";
import ExampleFooter from "@content/components/footer/examples/default.react";
import expectedHtml from "@content/components/footer/examples/default.html?raw";

describe("Matches i.AI expected HTML - Footer", () => {
    it("composition", () => {
        const html = renderReact(ExampleFooter, {});
        expect(renderedShape(html)).toEqual(renderedShape(expectedHtml));
    });
});
