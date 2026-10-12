import { describe, it, expect } from "vitest";
import { fileURLToPath } from "node:url";
import { renderSolid } from "../../../render/solid";
import { expectedShape, renderedShape } from "../../../match-iai-expected-html-helpers/expected";
import { ExampleModal } from "../examples/modal.solid";

const expectedPath = fileURLToPath(new URL("../expected.html", import.meta.url));

describe("Matches i.AI expected HTML - Modal", () => {
    it("composition", () => {
        const html = renderSolid(ExampleModal, {});
        expect(renderedShape(html)).toEqual(expectedShape(expectedPath));
    });
});
