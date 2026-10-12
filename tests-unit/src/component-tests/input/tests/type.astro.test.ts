import { describe, it, expect } from "vitest";
import { Input } from "@i-dot-ai-npm/component-library-astro";
import { renderAstro } from "../../../render/astro";

describe("Input type - Astro", () => {
    it("defaults to text", async () => {
        const html = await renderAstro(Input, {});
        expect(html.match(/type="[^"]*"/g)).toEqual(['type="text"']);
    });

    it("honours a passed type", async () => {
        const html = await renderAstro(Input, { type: "date" });
        expect(html.match(/type="[^"]*"/g)).toEqual(['type="date"']);
    });
});
