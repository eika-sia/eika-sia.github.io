import { getCollection } from "astro:content";
import { resolveSlug } from "../lib/slug";
import { site } from "../site.config";

export async function GET() {
	const posts = (await getCollection("blog")).sort(
		(a, b) =>
			new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
	);
	const items = posts
		.map((p) => {
			const slug = resolveSlug(p as any);
			return `\n  <item>\n    <title><![CDATA[${
				p.data.title
			}]]></title>\n    <link>${
				site.url
			}/blog/${slug}</link>\n    <guid>${
				site.url
			}/blog/${slug}</guid>\n    <pubDate>${new Date(
				p.data.date
			).toUTCString()}</pubDate>\n    <description><![CDATA[${
				p.data.description
			}]]></description>\n  </item>`;
		})
		.join("");
	const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n<channel>\n  <title>${site.title} Blog</title>\n  <link>${site.url}</link>\n  <description>${site.description}</description>${items}\n</channel>\n</rss>`;
	return new Response(xml, {
		headers: { "Content-Type": "application/xml" },
	});
}
