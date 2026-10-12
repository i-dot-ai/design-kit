import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { useEffect, useRef } from "react";

type TabsProps = ComponentPropsWithoutRef<'div'> & {
    class?: string;
    children?: ReactNode;
};

export default function Tabs({ class: className, children, ...rest }: TabsProps) {
    const ref = useRef<HTMLDivElement>(null);
    const classes = ["govuk-tabs", className ?? ""].filter(Boolean).join(" ");
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        // Dynamic import keeps govuk-frontend out of SSR (it touches
        // HTMLElement at module load, which is undefined in Node).
        void import("govuk-frontend").then(({ Tabs }) => {
            if (!ref.current) return;
            // Guard double-init (govuk stamps data-<module>-init).
            if (ref.current.hasAttribute(`data-${Tabs.moduleName}-init`)) return;
            new Tabs(ref.current);
        });
    }, []);

    return (
        <div className={classes} data-module="govuk-tabs" ref={ref} {...rest}>
            {children ?? ""}
        </div>
    );
}
