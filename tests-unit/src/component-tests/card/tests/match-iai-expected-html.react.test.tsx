import { describe, it, expect } from "vitest";
import { renderReact } from "../../../render/react";
import { renderedShape } from "../../../match-iai-expected-html-helpers/expected";
import ExampleCard from "@content/components/card/examples/default.react";
import expectedHtml from "@content/components/card/examples/default.html?raw";

describe("Matches i.AI expected HTML - Card", () => {
    it("composition", () => {
        const html = renderReact(ExampleCard, {});
        expect(renderedShape(html)).toEqual(renderedShape(expectedHtml));
    });
});
