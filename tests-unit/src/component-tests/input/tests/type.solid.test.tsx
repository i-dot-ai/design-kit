/** @jsxImportSource solid-js */
import { describe, it, expect } from "vitest";
import { Input } from "@i-dot-ai-npm/component-library-solid";
import { renderSolid } from "../../../render/solid";

describe("Input type - Solid", () => {
    it("defaults to text", () => {
        const html = renderSolid(Input, {});
        expect(html.match(/type="[^"]*"/g)).toEqual(['type="text"']);
    });

    it("honours a passed type", () => {
        const html = renderSolid(Input, { type: "date" });
        expect(html.match(/type="[^"]*"/g)).toEqual(['type="date"']);
    });
});
