import { describe, it, expect } from "vitest";
import { fileURLToPath } from "node:url";
import { renderReact } from "../../../render/react";
import { expectedShape, renderedShape } from "../../../match-iai-expected-html-helpers/expected";
import { ExampleCard } from "../examples/card.react";

const expectedPath = fileURLToPath(new URL("../expected.html", import.meta.url));

describe("Matches i.AI expected HTML - Card", () => {
    it("composition", () => {
        const html = renderReact(ExampleCard, {});
        expect(renderedShape(html)).toEqual(expectedShape(expectedPath));
    });
});
