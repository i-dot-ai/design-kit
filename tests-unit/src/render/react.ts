import { createElement, type ComponentType } from "react";
import { renderToStaticMarkup } from "react-dom/server";

/** Render a React component (with optional text child) to a static HTML string. */
export function renderReact(
    Component: ComponentType<Record<string, unknown>>,
    props: Record<string, unknown>,
    text?: string,
): string {
    return renderToStaticMarkup(createElement(Component, props, text));
}
