import { describe, it, expect } from "vitest";
import { Input } from "@i-dot-ai-npm/component-library-svelte";
import { renderSvelte } from "../../../render/svelte";

describe("Input type - Svelte", () => {
    it("defaults to text", () => {
        const html = renderSvelte(Input, {});
        expect(html.match(/type="[^"]*"/g)).toEqual(['type="text"']);
    });

    it("honours a passed type", () => {
        const html = renderSvelte(Input, { type: "date" });
        expect(html.match(/type="[^"]*"/g)).toEqual(['type="date"']);
    });
});
