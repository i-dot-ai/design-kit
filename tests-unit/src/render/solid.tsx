/** @jsxImportSource solid-js */
import { renderToString } from "solid-js/web";
import { createComponent, type Component } from "solid-js";

/** Render a Solid component (with optional text child) to a static HTML string. */
export function renderSolid(
    Comp: Component<Record<string, unknown>>,
    props: Record<string, unknown>,
    text?: string,
): string {
    const fullProps = text !== undefined ? { ...props, children: text } : props;
    return renderToString(() => createComponent(Comp, fullProps));
}
