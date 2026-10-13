import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type TagProps = ComponentPropsWithoutRef<'strong'> & {
    colour?: "grey" | "green" | "teal" | "turquoise" | "blue" | "light-blue" | "purple" | "magenta" | "pink" | "red" | "orange" | "yellow";
    class?: string;
    children?: ReactNode;
};

export default function Tag({ colour, class: className, children, ...rest }: TagProps) {
    const classes = [
        "govuk-tag",
        (colour ? { "grey": "govuk-tag--grey", "green": "govuk-tag--green", "teal": "govuk-tag--teal", "turquoise": "govuk-tag--turquoise", "blue": "govuk-tag--blue", "light-blue": "govuk-tag--light-blue", "purple": "govuk-tag--purple", "magenta": "govuk-tag--magenta", "pink": "govuk-tag--pink", "red": "govuk-tag--red", "orange": "govuk-tag--orange", "yellow": "govuk-tag--yellow" }[colour] : ""),
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <strong className={classes} {...rest}>
            {children ?? ""}
        </strong>
    );
}
