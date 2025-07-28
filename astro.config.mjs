// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
	site: "https://eikasia.net",
	base: "/",
	integrations: [tailwind()],
	output: "static",
	vite: {
		build: {
			rollupOptions: {
				output: {
					assetFileNames: "assets/[name].[hash][extname]",
					chunkFileNames: "assets/[name].[hash].js",
					entryFileNames: "assets/[name].[hash].js",
				},
			},
		},
	},
});
