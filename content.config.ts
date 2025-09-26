import { defineCollection, z } from "astro:content";

const blog = defineCollection({
	schema: z.object({
		title: z.string(),
		date: z.string(),
		description: z.string(),
		slug: z.string(),
		tags: z.array(z.string()),
		readTime: z.number().optional(),
	}),
});

const projects = defineCollection({
	schema: z.object({
		title: z.string(),
		date: z.string(),
		description: z.string(),
		slug: z.string(),
		tags: z.array(z.string()).default([]),
		progress: z.number().optional(),
		status: z.string().optional(), // e.g. 'ongoing', 'completed'
		collaborators: z.array(z.string()).default([]),
	}),
});

export const collections = { blog, projects };
