// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
// Heading anchor autolinking removed intentionally (was previously using rehype-autolink-headings)
// We keep rehype-slug so headings still get IDs for potential manual linking.

// https://astro.build/config
export default defineConfig({
	site: "https://eikasia.net",
	base: "/",
	integrations: [tailwind()],
	markdown: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [rehypeSlug],
		shikiConfig: {
			theme: "one-dark-pro",
			wrap: true,
		},
	},
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
