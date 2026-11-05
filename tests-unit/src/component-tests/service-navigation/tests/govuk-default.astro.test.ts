import { describe, it, expect } from "vitest";
import { renderAstro } from "../../../render/astro.js";
import FixtureServiceNav from "../examples/FixtureServiceNav.astro";

type NavItem = { href: string; text: string; current: boolean; active: boolean };

const items = (n: number): NavItem[] =>
    Array.from({ length: n }, (_, i) => ({ href: `#item-${i}`, text: `Item ${i}`, current: false, active: false }));

// The component default (no collapseNavigationOnMobile prop) should follow govuk-frontend:
// show the mobile menu toggle when there is more than one item.
describe("ServiceNavigation default toggle [astro]", () => {
    it("shows the toggle by default with more than one item", async () => {
        const html = await renderAstro(FixtureServiceNav as never, {
            hasNavigation: true,
            collapseNavigationOnMobile: undefined,
            items: items(2),
        });
        expect(html).toContain("govuk-js-service-navigation-toggle");
    });

    it("hides the toggle by default with a single item", async () => {
        const html = await renderAstro(FixtureServiceNav as never, {
            hasNavigation: true,
            collapseNavigationOnMobile: undefined,
            items: items(1),
        });
        expect(html).not.toContain("govuk-js-service-navigation-toggle");
    });
});
