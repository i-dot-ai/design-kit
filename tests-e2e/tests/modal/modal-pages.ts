import { expect, type Page } from "@playwright/test";

/** The five modal gallery pages: plain HTML plus one per framework. */
export const MODAL_PAGES = [
    { name: "html", path: "/test/modal/default/html" },
    { name: "astro", path: "/test/modal/default/astro" },
    { name: "react", path: "/test/modal/default/react" },
    { name: "solid", path: "/test/modal/default/solid" },
    { name: "svelte", path: "/test/modal/default/svelte" },
];

// Retry the click until the modal opens: the trigger renders before the
// framework island finishes hydrating, so an early click is a no-op.
export async function openModal(page: Page) {
    await expect(async () => {
        await page.getByTestId("open").click();
        await expect(page.getByTestId("modal")).toBeVisible({ timeout: 1000 });
    }).toPass({ timeout: 10000 });
}