// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [tailwindcss(), tsconfigPaths()],
    },
    integrations: [{
        name: "inject-global-styles",
        hooks: {
            "astro:config:setup": ({ injectScript }) => {
                injectScript("page", "import '@/styles/tailwind.css';");
            },
        },
		}, react()],
});