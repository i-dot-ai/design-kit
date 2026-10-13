import { describe, it, expect } from "vitest";
import { fileURLToPath } from "node:url";
import { renderSvelte } from "../../../render/svelte";
import { expectedShape, renderedShape } from "../../../match-iai-expected-html-helpers/expected";
import ExampleToggle from "../examples/ExampleToggle.svelte";

const expectedPath = fileURLToPath(new URL("../expected.html", import.meta.url));

describe("Matches i.AI expected HTML - Toggle", () => {
    it("composition", () => {
        const html = renderSvelte(ExampleToggle as never, {});
        expect(renderedShape(html)).toEqual(expectedShape(expectedPath));
    });
});
