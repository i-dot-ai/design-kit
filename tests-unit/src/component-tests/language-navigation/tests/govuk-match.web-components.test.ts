import { describe, it, expect } from "vitest";
import { renderHtml, esc, attrs } from "../../../render/web-components.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { languageNavigationFixtures, type LanguageNavigationData } from "../match-govuk-mappings.js";

const markup = (d: LanguageNavigationData) =>
    `<iai-language-navigation${attrs({ "aria-label": d.ariaLabel, class: d.classes, ...(d.attributes ?? {}) })}>${d.items
        .map((i) => `<iai-language-navigation-item${attrs({
            href: i.current ? undefined : i.href,
            current: i.current,
            lang: i.lang,
            dir: i.dir,
            hreflang: i.current ? undefined : i.hreflang,
            languagedescriptiontext: i.languageDescriptionText,
        })}>${esc(i.text)}</iai-language-navigation-item>`)
        .join("")}</iai-language-navigation>`;

describe("Matches govuk fixture shape - LanguageNavigation", () => {
    for (const fixture of languageNavigationFixtures()) {
        it(fixture.name, () => {
            const html = renderHtml(markup(fixture));
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
