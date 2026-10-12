import type { ComponentPropsWithoutRef } from 'react';

type ToggleProps = ComponentPropsWithoutRef<'input'> & {
    class?: string;
};

export default function Toggle({ class: className, ...rest }: ToggleProps) {
    const classes = ["iai-toggle__input", className ?? ""].filter(Boolean).join(" ");

    return <input className={classes} type="checkbox" role="switch" {...rest} />;
}
