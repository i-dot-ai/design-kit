import { getViteConfig } from "astro/config";
import { fileURLToPath } from "node:url";

export default getViteConfig({
    resolve: {
        alias: {
            "@content": fileURLToPath(new URL("../frontend/src/content", import.meta.url)),
        },
    },
    test: {
        name: "astro",
        include: ["src/**/*.astro.test.ts"],
        environment: "node",
    },
});
