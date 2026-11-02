import { describe, it, expect } from "vitest";
import { renderHtml } from "../render/web-components";
import { KEEPS_HOST, renderedShape, renderedShapeIgnoringHost } from "./expected";

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
        const host = KEEPS_HOST[name.split("/")[0]];
        const shape = (html: string) => (host ? renderedShapeIgnoringHost(html, host) : renderedShape(html));
        it(name, () => {
            expect(examples[expectedPath], `missing ${expectedPath}`).toBeDefined();
            expect(shape(renderHtml(source.trim()))).toEqual(shape(examples[expectedPath].trim()));
        });
    }
});
