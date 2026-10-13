import { defineConfig, devices } from "@playwright/test";

const PORT = 4321;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
    testDir: "./tests",
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    reporter: process.env.CI ? "github" : "list",
    use: {
        baseURL,
        trace: "on-first-retry",
    },
    projects: [
        { name: "chromium", use: { ...devices["Desktop Chrome"] } },
        { name: "firefox", use: { ...devices["Desktop Firefox"] } },
        { name: "webkit", use: { ...devices["Desktop Safari"] } },
    ],
    // Run the built node entry directly rather than `astro dev`/`preview`,
    // which daemonise and look to Playwright like the server exiting early.
    // ENVIRONMENT=local makes the gallery auth middleware auto-authorise.
    webServer: {
        command:
            "pnpm --filter component-library-gallery build && node gallery/dist/server/entry.mjs",
        url: baseURL,
        cwd: "..",
        reuseExistingServer: !process.env.CI,
        timeout: 180_000,
        env: {
            ENVIRONMENT: "local",
            HOST: "0.0.0.0",
            PORT: String(PORT),
        },
    },
});
