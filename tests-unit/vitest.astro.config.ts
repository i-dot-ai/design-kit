import { getViteConfig } from "astro/config";

export default getViteConfig({
    test: {
        name: "astro",
        include: ["src/**/*.astro.test.ts"],
        environment: "node",
    },
});
