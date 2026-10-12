import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { useEffect, useRef } from "react";

type AccordionProps = ComponentPropsWithoutRef<'div'> & {
    class?: string;
    children?: ReactNode;
};

export default function Accordion({ class: className, children, ...rest }: AccordionProps) {
    const ref = useRef<HTMLDivElement>(null);
    const classes = ["govuk-accordion", className ?? ""].filter(Boolean).join(" ");
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        // Dynamic import keeps govuk-frontend out of SSR (it touches
        // HTMLElement at module load, which is undefined in Node).
        void import("govuk-frontend").then(({ Accordion }) => {
            if (!ref.current) return;
            // Guard double-init (govuk stamps data-<module>-init).
            if (ref.current.hasAttribute(`data-${Accordion.moduleName}-init`)) return;
            new Accordion(ref.current);
        });
    }, []);

    return (
        <div className={classes} data-module="govuk-accordion" ref={ref} {...rest}>
            {children ?? ""}
        </div>
    );
}
