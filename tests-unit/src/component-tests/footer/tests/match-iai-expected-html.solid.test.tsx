import { describe, it, expect } from "vitest";
import { fileURLToPath } from "node:url";
import { renderSolid } from "../../../render/solid";
import { expectedShape, renderedShape } from "../../../match-iai-expected-html-helpers/expected";
import { ExampleFooter } from "../examples/footer.solid";

const expectedPath = fileURLToPath(new URL("../expected.html", import.meta.url));

describe("Matches i.AI expected HTML - Footer", () => {
    it("composition", () => {
        const html = renderSolid(ExampleFooter, {});
        expect(renderedShape(html)).toEqual(expectedShape(expectedPath));
    });
});
