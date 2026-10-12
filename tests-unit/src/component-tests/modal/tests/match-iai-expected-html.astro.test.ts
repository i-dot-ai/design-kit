import { describe, it, expect } from "vitest";
import { fileURLToPath } from "node:url";
import { renderAstro } from "../../../render/astro";
import { expectedShape, renderedShape } from "../../../match-iai-expected-html-helpers/expected";
import ExampleModal from "../examples/ExampleModal.astro";

const expectedPath = fileURLToPath(new URL("../expected.html", import.meta.url));

describe("Matches i.AI expected HTML - Modal", () => {
    it("composition", async () => {
        const html = await renderAstro(ExampleModal, {});
        expect(renderedShape(html)).toEqual(expectedShape(expectedPath));
    });
});
