import { defineConfig, devices } from "@playwright/test";

const PORT = 4321;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
    testDir: "./tests",
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    reporter: process.env.CI
        ? [["github"], ["html", { open: "never" }]]
        : "list",
    use: {
        baseURL,
        trace: "on-first-retry",
    },
    projects: [
        { name: "chromium", use: { ...devices["Desktop Chrome"] } },
        { name: "firefox", use: { ...devices["Desktop Firefox"] } },
        { name: "webkit", use: { ...devices["Desktop Safari"] } },
    ],
    webServer: {
        command: "pnpm --filter ./frontend build && node frontend/dist/server/entry.mjs",
        url: baseURL,
        cwd: "..",
        timeout: 180_000,
        reuseExistingServer: !process.env.CI,
        env: {
            ENVIRONMENT: "local",
            HOST: "0.0.0.0",
            PORT: String(PORT),
        },
    },
});
