import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type FooterLink = { href?: string; text?: string; attributes?: Record<string, string> };

type FooterProps = ComponentPropsWithoutRef<'div'> & {
    /** Support links shown in the inline list (e.g. Accessibility statement, Cookies, Privacy). */
    links?: FooterLink[];
    /** Visually-hidden heading above the support links. */
    visuallyHiddenTitle?: string;
    containerClasses?: string;
    class?: string;
    children?: ReactNode;
};

export default function Footer({
    links,
    visuallyHiddenTitle,
    containerClasses,
    class: className,
    children,
    ...rest
}: FooterProps) {
    const classes = ['govuk-footer', 'iai-footer', className ?? ''].filter(Boolean).join(' ');
    const containerClass = ['govuk-width-container', containerClasses ?? '']
        .filter(Boolean)
        .join(' ');

    return (
        <div className={classes} {...rest}>
            <div className={containerClass}>
                <div className="govuk-footer__meta">
                    <div className="govuk-footer__meta-item govuk-footer__meta-item--grow">
                        <h2 className="govuk-visually-hidden">
                            {visuallyHiddenTitle ?? 'Support links'}
                        </h2>
                        {links && links.length > 0 && (
                            <ul className="govuk-footer__inline-list">
                                {links.map((link, i) => (
                                    <li key={i} className="govuk-footer__inline-list-item">
                                        <a
                                            className="govuk-footer__link"
                                            href={link.href}
                                            {...(link.attributes ?? {})}
                                        >
                                            {link.text}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <div className="govuk-footer__meta-custom">
                            Built by the{' '}
                            <a className="govuk-footer__link" href="https://ai.gov.uk/">
                                Incubator for Artificial Intelligence
                            </a>
                        </div>
                    </div>
                    <div className="govuk-footer__meta-item">{children}</div>
                </div>
            </div>
        </div>
    );
}
