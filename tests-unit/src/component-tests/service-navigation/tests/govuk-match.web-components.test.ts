import { describe, it, expect } from "vitest";
import { renderHtml, renderWebComponent, esc, attrs } from "../../../render/web-components.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { serviceNavFixtures, type ServiceNavData } from "../match-govuk-mappings.js";

const markup = (d: ServiceNavData) =>
    `<iai-service-navigation${attrs({
        class: d.classes,
        servicename: d.serviceName,
        serviceurl: d.serviceUrl,
        collapsenavigationonmobile: d.collapseNavigationOnMobile,
        endslotinline: d.endSlotInline,
    })}>${d.items
        .map((i) => `<iai-service-navigation-item${attrs({ href: i.href, current: i.current, active: i.active })}>${i.html ?? esc(i.text ?? "")}</iai-service-navigation-item>`)
        .join("")}${d.endSlotHtml !== undefined ? `<div slot="end">${d.endSlotHtml}</div>` : ""}</iai-service-navigation>`;

describe("Matches govuk fixture shape - ServiceNavigation", () => {
    for (const fixture of serviceNavFixtures()) {
        it(fixture.name, () => {
            const html = renderHtml(markup(fixture));
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
