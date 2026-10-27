import "@i-dot-ai-npm/component-library-web-components";

export function esc(value: string): string {
    return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function attrs(values: Record<string, string | number | boolean | undefined>): string {
    return Object.entries(values)
        .filter(([, v]) => v !== undefined && v !== false)
        .map(([k, v]) => (v === true ? ` ${k}` : ` ${k}="${esc(String(v))}"`))
        .join("");
}

export function renderHtml(html: string): string {
    const host = document.createElement("div");
    host.innerHTML = html;
    document.body.append(host);
    const out = host.innerHTML;
    host.remove();
    return out;
}

/** shortcut: attributes only, upgrade if a prop can't round-trip through a string. */
export function renderWebComponent(
    tag: string,
    props: Record<string, unknown>,
    text?: string,
): string {
    const el = document.createElement(tag);
    for (const [key, value] of Object.entries(props)) {
        if (value === undefined || value === null || value === false) continue;
        el.setAttribute(key, value === true ? "" : String(value));
    }
    if (text !== undefined) el.innerHTML = text;
    return renderHtml(el.outerHTML);
}
