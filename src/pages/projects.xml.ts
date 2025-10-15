import { getCollection } from "astro:content";
import { resolveSlug } from "../lib/slug";
import { site } from "../site.config";

export async function GET() {
	const projects = (await getCollection("projects")).sort(
		(a, b) =>
			new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
	);

	const items = projects
		.map((p) => {
			const slug = resolveSlug(p as any);
			const url = `${site.url}/projects/${slug}`;
			return `  <item>\n    <title><![CDATA[${
				p.data.title
			}]]></title>\n    <link>${url}</link>\n    <guid>${url}</guid>\n    <pubDate>${new Date(
				p.data.date
			).toUTCString()}</pubDate>\n    <description><![CDATA[${
				p.data.description || ""
			}]]></description>\n  </item>`;
		})
		.join("\n");

	const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n<channel>\n  <title>${site.title} – Projects</title>\n  <link>${site.url}/projects</link>\n  <description>${site.description}</description>\n${items}\n</channel>\n</rss>`;

	return new Response(xml, {
		headers: {
			"Content-Type": "application/xml; charset=utf-8",
			"Cache-Control": "public, max-age=600",
		},
	});
}
