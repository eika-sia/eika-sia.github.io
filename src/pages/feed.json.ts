import { getCollection } from "astro:content";
import { site } from "../site.config";

/**
 * Simple JSON Feed (https://www.jsonfeed.org/version/1) combining blog + projects.
 */
export async function GET() {
	const [blog, projects] = await Promise.all([
		getCollection("blog"),
		getCollection("projects"),
	]);
	const items = [...blog, ...projects]
		.sort(
			(a, b) =>
				new Date(b.data.date).getTime() -
				new Date(a.data.date).getTime()
		)
		.map((entry) => ({
			id:
				site.url +
				"/" +
				(entry.collection === "blog" ? "blog" : "projects") +
				"/" +
				(entry.data.slug ||
					(entry as any).slug ||
					entry.id.replace(/\.md$/, "")),
			url:
				site.url +
				"/" +
				(entry.collection === "blog" ? "blog" : "projects") +
				"/" +
				(entry.data.slug ||
					(entry as any).slug ||
					entry.id.replace(/\.md$/, "")),
			title: entry.data.title,
			content_text: entry.data.description,
			date_published: entry.data.date,
			tags: entry.data.tags || [],
		}));

	return new Response(
		JSON.stringify(
			{
				version: "https://jsonfeed.org/version/1",
				title: site.title,
				home_page_url: site.url,
				feed_url: site.url + "/feed.json",
				description: site.description,
				items,
			},
			null,
			2
		),
		{
			headers: { "Content-Type": "application/feed+json; charset=utf-8" },
		}
	);
}
