import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type LanguageNavigationItemProps = Omit<ComponentPropsWithoutRef<'span'> & ComponentPropsWithoutRef<'a'>, 'href' | 'dir'> & {
    href?: string;
    current?: boolean;
    lang?: string;
    dir?: string;
    /** hreflang for link items; defaults to `lang` when omitted. */
    hreflang?: string;
    /** Visually-hidden description appended to a link item. */
    languageDescriptionText?: string;
    children?: ReactNode;
};

export default function LanguageNavigationItem({
    href,
    current = false,
    lang,
    dir,
    hreflang,
    languageDescriptionText,
    children,
    ...rest
}: LanguageNavigationItemProps) {
    return (
        <li className="govuk-language-navigation__list-item">
            {current ? (
                <span
                    className="govuk-language-navigation__text"
                    aria-current="true"
                    lang={lang}
                    dir={dir}
                    {...rest}
                >
                    {children}
                </span>
            ) : (
                <a
                    className="govuk-language-navigation__link"
                    href={href}
                    rel="alternate"
                    lang={lang}
                    hrefLang={hreflang ?? lang}
                    dir={dir}
                    {...rest}
                >
                    {children}
                    {languageDescriptionText ? (
                        <span className="govuk-visually-hidden"> {languageDescriptionText}</span>
                    ) : null}
                </a>
            )}
        </li>
    );
}
