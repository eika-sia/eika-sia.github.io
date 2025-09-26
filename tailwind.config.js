/** @type {import('tailwindcss').Config} */
const typography = require("@tailwindcss/typography");

module.exports = {
	content: ["./src/**/*.{astro,js,jsx,ts,tsx,md,mdx}", "./public/**/*.html"],
	theme: {
		extend: {
			typography: ({ theme }) => ({
				invert: {
					css: {
						"--tw-prose-body": theme("colors.slate.300"),
						"--tw-prose-headings": theme("colors.white"),
						"--tw-prose-links": "var(--accent-soft)",
						"--tw-prose-bold": theme("colors.white"),
						"--tw-prose-bullets": "var(--accent-soft)",
						"--tw-prose-hr": theme("colors.slate.700"),
						"--tw-prose-quotes": theme("colors.slate.200"),
						"--tw-prose-quote-borders": theme("colors.slate.600"),
						"--tw-prose-code": theme("colors.slate.200"),
						"--tw-prose-pre-bg": theme("colors.slate.900"),
						"--tw-prose-th-borders": theme("colors.slate.600"),
						"--tw-prose-td-borders": theme("colors.slate.700"),
						"h1,h2,h3,h4": {
							"scroll-margin-top": theme("spacing.24"),
						},
						"code::before": { content: '""' },
						"code::after": { content: '""' },
						"pre code": { background: "transparent", padding: 0 },
					},
				},
			}),
		},
	},
	plugins: [typography],
};
