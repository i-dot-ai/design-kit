import { experimental_AstroContainer as AstroContainer } from "astro/container";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";

/** Render an Astro component (with optional default-slot text) to an HTML string. */
export async function renderAstro(
    Component: AstroComponentFactory,
    props: Record<string, unknown>,
    text?: string,
): Promise<string> {
    const container = await AstroContainer.create();
    return container.renderToString(Component, {
        props,
        slots: text !== undefined ? { default: text } : undefined,
    });
}
