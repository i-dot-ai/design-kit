import { describe, it, expect } from "vitest";
import { fileURLToPath } from "node:url";
import { renderSolid } from "../../../render/solid";
import { expectedShape, renderedShape } from "../../../match-iai-expected-html-helpers/expected";
import { ExampleToggle } from "../examples/toggle.solid";

const expectedPath = fileURLToPath(new URL("../expected.html", import.meta.url));

describe("Matches i.AI expected HTML - Toggle", () => {
    it("composition", () => {
        const html = renderSolid(ExampleToggle, {});
        expect(renderedShape(html)).toEqual(expectedShape(expectedPath));
    });
});
