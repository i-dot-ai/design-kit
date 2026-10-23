export function upgrade(
    host: HTMLElement,
    tag: string,
    classes: (string | false | null | undefined)[],
    keep: string[] = [],
    attrs: Record<string, string> = {},
): HTMLElement {
    const el = document.createElement(tag);
    const className = classes.filter(Boolean).join(" ");
    if (className) el.className = className;
    for (const [name, value] of Object.entries(attrs)) el.setAttribute(name, value);
    for (const a of Array.from(host.attributes)) {
        if (keep.includes(a.name)) continue;
        if (a.name === "class") el.classList.add(...a.value.split(/\s+/).filter(Boolean));
        else el.setAttribute(a.name, a.value);
    }
    el.append(...host.childNodes);
    host.replaceWith(el);
    return el;
}

export function wrapContents(parent: HTMLElement, tag: string, className: string): HTMLElement {
    const inner = document.createElement(tag);
    if (className) inner.className = className;
    inner.append(...parent.childNodes);
    parent.append(inner);
    return inner;
}

export function wrapWith(el: HTMLElement, tag: string, className: string): HTMLElement {
    const outer = document.createElement(tag);
    if (className) outer.className = className;
    el.replaceWith(outer);
    outer.append(el);
    return outer;
}
