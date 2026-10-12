import { parse, HTMLElement, NodeType } from "node-html-parser";

/**
 * A normalised description of a rendered element, independent of framework
 * output quirks (attribute order, insignificant whitespace, class ordering).
 *
 * Two implementations that produce the same `Shape` are considered equivalent.
 */
export type Shape = {
    /** Lower-cased tag name, e.g. "button" | "a". */
    tag: string;
    /** Class names as a sorted, de-duplicated list (order-insensitive). */
    classes: string[];
    /** Attribute name -> value, excluding `class` (handled separately). */
    attrs: Record<string, string>;
    /** Collapsed, trimmed visible text content. */
    text: string;
    /** Child element shapes, in document order. */
    children: Shape[];
};

function firstElement(root: HTMLElement): HTMLElement {
    const el = root.querySelector("*");
    if (!el) {
        throw new Error(
            `reduce(): no element found in HTML:\n${root.toString()}`,
        );
    }
    return el;
}

function collapseText(value: string): string {
    return value
        .replace(/<!---->|<!>/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

function elementToShape(el: HTMLElement): Shape {
    const attrs: Record<string, string> = {};
    for (const [name, value] of Object.entries(el.attributes)) {
        if (name === "class") continue;
        // HTML attribute names are case-insensitive; lower-case them so that
        // framework prop casing (e.g. React's `inputMode`) matches govuk's
        // lower-case output (`inputmode`).
        attrs[name.toLowerCase()] = value;
    }

    const classes = (el.getAttribute("class") ?? "")
        .split(/\s+/)
        .filter(Boolean);

    const children = el.childNodes
        .filter((n): n is HTMLElement => n instanceof HTMLElement)
        .map(elementToShape);

    // Direct (non-descendant) text of this element only.
    const ownText = collapseText(
        el.childNodes
            .filter((n) => !(n instanceof HTMLElement))
            .map((n) => n.text)
            .join(""),
    );

    return {
        tag: el.rawTagName?.toLowerCase() ?? "",
        classes: Array.from(new Set(classes)).sort(),
        attrs,
        text: ownText,
        children,
    };
}

/**
 * Reduce an HTML string to its normalised `Shape`.
 *
 * The first element in the string is treated as the root; wrapping/whitespace
 * text nodes at the top level are ignored.
 */
export function reduce(html: string): Shape {
    const root = parse(html, { comment: false });
    return elementToShape(firstElement(root));
}
