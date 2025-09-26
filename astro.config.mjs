// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

// https://astro.build/config
export default defineConfig({
	site: "https://eikasia.net",
	base: "/",
	integrations: [tailwind()],
	markdown: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [
			rehypeSlug,
			[
				rehypeAutolinkHeadings,
				{
					behavior: "append",
					properties: { class: "heading-anchor" },
					content: {
						type: "element",
						tagName: "span",
						properties: { class: "anchor-symbol" },
						children: [{ type: "text", value: "¶" }],
					},
				},
			],
		],
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
