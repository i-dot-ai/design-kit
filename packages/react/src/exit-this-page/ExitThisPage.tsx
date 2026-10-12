import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type ExitThisPageProps = ComponentPropsWithoutRef<'div'> & {
    redirectUrl?: string;
    id?: string;
    class?: string;
    children?: ReactNode;
};

export default function ExitThisPage({
    redirectUrl = 'https://www.bbc.co.uk/weather',
    id,
    class: className,
    children,
    ...rest
}: ExitThisPageProps) {
    const classes = ['govuk-exit-this-page', className ?? ''].filter(Boolean).join(' ');

    return (
        <div id={id} className={classes} data-module="govuk-exit-this-page" {...rest}>
            <a
                href={redirectUrl}
                role="button"
                draggable="false"
                className="govuk-button govuk-button--warning govuk-exit-this-page__button govuk-js-exit-this-page-button"
                data-module="govuk-button"
                rel="nofollow noreferrer"
            >
                {children ? (
                    children
                ) : (
                    <>
                        <span className="govuk-visually-hidden">Emergency</span> Exit this page
                    </>
                )}
            </a>
        </div>
    );
}
