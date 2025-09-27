import { getCollection } from "astro:content";
import { resolveSlug } from "../lib/slug";
import { site } from "../site.config";

export async function GET() {
	const staticPaths = ["/", "/cv", "/projects", "/blog"];
	const posts = await getCollection("blog");
	const urls = [
		...staticPaths.map((p) => ({ loc: `${site.url}${p}` })),
		...posts.map((p) => ({
			loc: `${site.url}/blog/${resolveSlug(p as any)}`,
		})),
	];
	const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
		.map((u) => `  <url><loc>${u.loc}</loc></url>`)
		.join("\n")}\n</urlset>`;
	return new Response(xml, {
		headers: { "Content-Type": "application/xml" },
	});
}
