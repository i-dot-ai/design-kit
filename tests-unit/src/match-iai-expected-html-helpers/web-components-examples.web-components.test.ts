import { describe, it, expect } from "vitest";
import { renderHtml } from "../render/web-components";
import { renderedShape } from "./expected";

const examples = import.meta.glob("/../frontend/src/content/components/*/examples/*.html", {
    query: "?raw",
    import: "default",
    eager: true,
}) as Record<string, string>;

describe("Web component examples match their HTML examples", () => {
    for (const [path, source] of Object.entries(examples)) {
        if (!path.endsWith(".web-components.html")) continue;
        const expectedPath = path.replace(/\.web-components\.html$/, ".html");
        const name = path.split("/components/")[1];
        it(name, () => {
            expect(examples[expectedPath], `missing ${expectedPath}`).toBeDefined();
            expect(renderedShape(renderHtml(source.trim()))).toEqual(renderedShape(examples[expectedPath].trim()));
        });
    }
});
