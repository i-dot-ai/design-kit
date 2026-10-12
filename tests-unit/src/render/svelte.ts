import { render } from "svelte/server";
import { createRawSnippet } from "svelte";
import type { Component } from "svelte";

/**
 * Build a Svelte `children` snippet that renders a single text node, so plain
 * text fixture content can be passed to components that use `{@render children()}`.
 */
function textSnippet(text: string) {
    return createRawSnippet(() => ({
        render: () => `${text}`,
    }));
}

/** Render a Svelte 5 component (with optional text child) to an HTML string. */
export function renderSvelte(
    Comp: Component<Record<string, unknown>>,
    props: Record<string, unknown>,
    text?: string,
): string {
    const fullProps =
        text !== undefined
            ? { ...props, children: textSnippet(text) }
            : props;
    const { body } = render(Comp, { props: fullProps });
    return body;
}
