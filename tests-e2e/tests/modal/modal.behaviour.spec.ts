import { test, expect, type Page } from "@playwright/test";
import { MODAL_PAGES } from "./modal-pages";

async function openModal(page: Page) {
    await page.getByTestId("open").click();
    await expect(page.getByTestId("modal")).toBeVisible();
}

for (const target of MODAL_PAGES) {
    test.describe(`behaviour: ${target.name}`, () => {
        test.beforeEach(async ({ page }) => {
            await page.goto(target.path);
        });

        test("opens from the trigger", async ({ page }) => {
            await expect(page.getByTestId("modal")).toBeHidden();
            await openModal(page);
            const isOpen = await page.getByTestId("modal").evaluate(
                (el) => (el as HTMLDialogElement).open,
            );
            expect(isOpen).toBe(true);
        });

        test("Escape closes the modal", async ({ page }) => {
            await openModal(page);
            await page.keyboard.press("Escape");
            await expect(page.getByTestId("modal")).toBeHidden();
        });

        test("backdrop click closes the modal", async ({ page }) => {
            await openModal(page);
            // Click the viewport corner, which is the ::backdrop region outside
            // the centred dialog.
            await page.mouse.click(5, 5);
            await expect(page.getByTestId("modal")).toBeHidden();
        });

        test("a close button inside the modal closes it", async ({ page }) => {
            await openModal(page);
            await page.getByTestId("cancel").click();
            await expect(page.getByTestId("modal")).toBeHidden();
        });

        test("focus moves to the dialog on open", async ({ page }) => {
            await openModal(page);
            const focusOnDialog = await page.evaluate(
                () => document.activeElement === document.querySelector('[data-testid="modal"]'),
            );
            expect(focusOnDialog).toBe(true);
        });

        test("focus returns to the trigger on close", async ({ page, browserName }) => {
            test.skip(browserName === "webkit", "webkit fires false negative, tested manually in Safari");

            const trigger = page.getByTestId("open");
            await trigger.click();
            await expect(page.getByTestId("modal")).toBeVisible();
            await page.keyboard.press("Escape");
            await expect(page.getByTestId("modal")).toBeHidden();
            await expect(trigger).toBeFocused();
        });

        test("focus is trapped within the modal", async ({ page }) => {
            await openModal(page);
            for (let i = 0; i < 6; i++) {
                await page.keyboard.press("Tab");
                const escaped = await page.evaluate(() => {
                    const dialog = document.querySelector('[data-testid="modal"]');
                    const active = document.activeElement;
                    if (!dialog || !active) return false;
                    if (active === document.body) return false;
                    return !dialog.contains(active);
                });
                expect(escaped).toBe(false);
            }
        });

        test("background scroll is locked while open", async ({ page }) => {
            await openModal(page);
            await expect
                .poll(() =>
                    page.evaluate(() =>
                        document.documentElement.classList.contains("iai-modal-scroll-locked"),
                    ),
                )
                .toBe(true);
        });

        test("background scroll is released after close", async ({ page }) => {
            await openModal(page);
            await page.keyboard.press("Escape");
            await expect(page.getByTestId("modal")).toBeHidden();
            // Scroll-lock release happens in the dialog's close handler, which
            // runs just after the dialog hides; poll rather than assert once.
            await expect
                .poll(() =>
                    page.evaluate(() =>
                        document.documentElement.classList.contains("iai-modal-scroll-locked"),
                    ),
                )
                .toBe(false);
        });
    });
}
