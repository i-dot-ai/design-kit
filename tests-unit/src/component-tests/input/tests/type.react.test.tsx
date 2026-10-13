import { describe, it, expect } from "vitest";
import { Input } from "@i-dot-ai-npm/component-library-react";
import { renderReact } from "../../../render/react";

describe("Input type - React", () => {
    it("defaults to text", () => {
        const html = renderReact(Input, {});
        expect(html.match(/type="[^"]*"/g)).toEqual(['type="text"']);
    });

    it("honours a passed type", () => {
        const html = renderReact(Input, { type: "date" });
        expect(html.match(/type="[^"]*"/g)).toEqual(['type="date"']);
    });
});
