import { describe, it, expect } from "vitest";
import { fileURLToPath } from "node:url";
import { renderSolid } from "../../../render/solid";
import { expectedShape, renderedShape } from "../../../match-iai-expected-html-helpers/expected";
import { ExampleCard } from "../examples/card.solid";

const expectedPath = fileURLToPath(new URL("../expected.html", import.meta.url));

describe("Matches i.AI expected HTML - Card", () => {
    it("composition", () => {
        const html = renderSolid(ExampleCard, {});
        expect(renderedShape(html)).toEqual(expectedShape(expectedPath));
    });
});
