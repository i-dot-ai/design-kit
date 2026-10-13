import type { ReactNode } from 'react';

type RadioDividerProps = {
    class?: string;
    children?: ReactNode;
};

export default function RadioDivider({ class: className, children }: RadioDividerProps) {
    const classes = ["govuk-radios__divider", className ?? ""].filter(Boolean).join(" ");

    return (
        <div className={classes}>
            {children ?? "or"}
        </div>
    );
}
