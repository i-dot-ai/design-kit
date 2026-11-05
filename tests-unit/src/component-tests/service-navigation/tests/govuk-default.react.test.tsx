import { describe, it, expect } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ServiceNavigation, ServiceNavigationItem } from "@i-dot-ai-npm/component-library-react";

const reactItems = (n: number) =>
    Array.from({ length: n }, (_, i) =>
        createElement(ServiceNavigationItem, { key: i, href: `#item-${i}` }, `Item ${i}`),
    );

// The component default (no collapseNavigationOnMobile prop) should follow govuk-frontend:
// show the mobile menu toggle when there is more than one item.
describe("ServiceNavigation default toggle [react]", () => {
    it("shows the toggle by default with more than one item", () => {
        const html = renderToStaticMarkup(createElement(ServiceNavigation, {}, reactItems(2)));
        expect(html).toContain("govuk-js-service-navigation-toggle");
    });

    it("hides the toggle by default with a single item", () => {
        const html = renderToStaticMarkup(createElement(ServiceNavigation, {}, reactItems(1)));
        expect(html).not.toContain("govuk-js-service-navigation-toggle");
    });
});
