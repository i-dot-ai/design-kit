/** @jsxImportSource solid-js */

import { splitProps, onMount } from "solid-js";
import type { JSX } from "solid-js";

type TabsProps = JSX.IntrinsicElements['div'] & {
    class?: string;
    children?: JSX.Element;
};

export default function Tabs(props: TabsProps) {
    let el: HTMLDivElement | undefined;
    const [local, rest] = splitProps(props, ["class", "children"]);
    const classes = () =>
        ["govuk-tabs", local.class ?? ""].filter(Boolean).join(" ");
    onMount(() => {
        if (!el) return;
        // Dynamic import keeps govuk-frontend out of SSR.
        void import("govuk-frontend").then(({ Tabs }) => {
            if (!el) return;
            if (el.hasAttribute(`data-${Tabs.moduleName}-init`)) return;
            new Tabs(el);
        });
    });

    return (
        <div class={classes()} data-module="govuk-tabs" ref={el} {...rest}>
            {local.children ?? ""}
        </div>
    );
}
