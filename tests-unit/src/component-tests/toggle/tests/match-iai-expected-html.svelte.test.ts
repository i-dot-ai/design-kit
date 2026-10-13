import { describe, it, expect } from "vitest";
import { renderSvelte } from "../../../render/svelte";
import { renderedShape } from "../../../match-iai-expected-html-helpers/expected";
import ExampleToggle from "@content/components/toggle/examples/default.svelte";
import expectedHtml from "@content/components/toggle/examples/default.html?raw";

describe("Matches i.AI expected HTML - Toggle", () => {
    it("composition", () => {
        const html = renderSvelte(ExampleToggle as never, {});
        expect(renderedShape(html)).toEqual(renderedShape(expectedHtml));
    });
});
