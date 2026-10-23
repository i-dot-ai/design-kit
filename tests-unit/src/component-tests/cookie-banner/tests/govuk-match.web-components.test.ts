import { describe, it, expect } from "vitest";
import { renderHtml, esc, attrs } from "../../../render/web-components.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { cookieBannerFixtures, type CookieBannerData, type CookieMessage, type CookieAction } from "../match-govuk-mappings.js";

const action = (a: CookieAction) =>
    a.href !== undefined
        ? `<a class="govuk-link" href="${esc(a.href)}">${esc(a.text)}</a>`
        : `<iai-button${attrs({ type: a.type, name: a.name, value: a.value })}>${esc(a.text)}</iai-button>`;

const message = (m: CookieMessage) => {
    const heading = m.headingHtml !== undefined || m.headingText !== undefined
        ? `<iai-cookie-banner-heading>${m.headingHtml ?? esc(m.headingText ?? "")}</iai-cookie-banner-heading>`
        : "";
    const content = `<iai-cookie-banner-content>${m.html ?? `<p class="govuk-body">${esc(m.text ?? "")}</p>`}</iai-cookie-banner-content>`;
    const actions = m.actions.length ? `<iai-cookie-banner-actions>${m.actions.map(action).join("")}</iai-cookie-banner-actions>` : "";
    return `<iai-cookie-banner-message${attrs({ role: m.role })}><div class="govuk-grid-row"><div class="govuk-grid-column-two-thirds">${heading}${content}</div></div>${actions}</iai-cookie-banner-message>`;
};

const markup = (d: CookieBannerData) => `<iai-cookie-banner>${d.messages.map(message).join("")}</iai-cookie-banner>`;

describe("Matches govuk fixture shape - CookieBanner", () => {
    for (const fixture of cookieBannerFixtures()) {
        it(fixture.name, () => {
            const html = renderHtml(markup(fixture));
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
