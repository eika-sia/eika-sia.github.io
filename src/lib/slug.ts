// Centralized slug resolution utility
// Prefers explicit frontmatter slug (non-empty after trim), then Astro entry.slug (if provided), then filename fallback.
export function slugify(input: string) {
	// Normalize diacritics, remove combining marks
	return input
		.normalize("NFD")
		.replace(/\p{Diacritic}+/gu, "")
		.toLowerCase()
		.trim()
		.replace(/['"`]/g, "")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

export function resolveSlug(entry: { id: string; slug?: string; data: any }) {
	// 1. Explicit frontmatter slug wins
	const explicit =
		entry?.data?.slug && typeof entry.data.slug === "string"
			? entry.data.slug.trim()
			: "";
	if (explicit) return explicit;
	// 2. Derive from title if available (stable even if filename changes)
	if (entry?.data?.title && typeof entry.data.title === "string") {
		const fromTitle = slugify(entry.data.title);
		if (fromTitle) return fromTitle;
	}
	// 3. Fall back to Astro-generated slug (may be filename based)
	const generated =
		(entry as any).slug && typeof (entry as any).slug === "string"
			? (entry as any).slug
			: "";
	if (generated) return generated;
	// 4. Final fallback: filename without extension
	return entry.id.replace(/\.md$/, "");
}

// Optional helper to annotate an entry with resolved slug in data (non-mutating)
export function withResolvedSlug<T extends { id: string; data: any }>(
	entry: T
) {
	const slug = resolveSlug(entry as any);
	return { ...entry, data: { ...entry.data, slug }, slug } as T & {
		slug: string;
	};
}

// Ensure uniqueness of slugs across a collection set; warn on collisions and suffix duplicates.
export function ensureUniqueSlugs<
	T extends { id: string; data: any; slug?: string }
>(entries: T[]) {
	const map = new Map<string, number>();
	return entries.map((e) => {
		const base = resolveSlug(e as any);
		const count = map.get(base) || 0;
		map.set(base, count + 1);
		const finalSlug = count === 0 ? base : `${base}-${count + 1}`;
		if (count > 0 && import.meta.env.DEV) {
			console.warn(
				`[slug] collision for '${base}' -> using '${finalSlug}' (source: ${e.id})`
			);
		}
		return {
			...e,
			data: { ...e.data, slug: finalSlug },
			slug: finalSlug,
		} as T & { slug: string };
	});
}
