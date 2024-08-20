// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "Prince Muel | Personal Portfolio Website Template";
export const SITE_DESCRIPTION = "";
export const GENERATE_SLUG_FROM_TITLE = true;
export const ENABLE_TRANSITIONS_API = true;
export const DEFAULT_SITE_THEME = "dark";
export const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24 * 1;
export const delimiter = "-";
export const published_date = new Date("2024-02-01T16:43:29.577Z");

export const homeKeywords = [
	"princemuel",
	"iamprincemuel",
	"princemuel_cs",
	"pHoeniX-svg",
	"Prince Muel",
	"Samuel Chukwuzube",
	"Software Engineer",
	"Frontend Engineer",
	"Web Developer",
	"React Developer",
	"Coding Instructor",
	"Musician",
	"Educator",
	"React",
	"Node.js",
	"GraphQL",
	"JavaScript",
	"Typescript",
	"Frontend Development",
	"Web Design",
	"UI/UX",
	"Web Applications",
	"Tech Industry",
	"Portfolio",
	"Africa",
];

export const defaultKeywords = [
	"React",
	"Qwik",
	"Astro",
	"Remix",
	"Next.js",
	"JavaScript",
	"TypeScript",
	"Styled Components",
	"TailwindCSS",
	"Jest",
	"Vitest",
	"Rust",
	"React Testing Libary",
	"Node.js",
	"MongoDB",
	"Jamstack",
	"Component Library",
	"Serverless Functions",
	"Edge Functions",
	"SQL",
	"GraphQL",
	"Postgres",
	"Linux",
	"Security",
	"Homelab",
	"Bash",
	"Interview",
	"Engineering",
	"Competition",
	"Cloudflare",
	"Database",
	"Devops",
	"Oss",
	"Git",
	"Gatsby",
	"Golang",
	"Projects",
	"Performance",
	"Personal",
	"System Design",
	"Networking",
	"Frontend Development",
	"Web Design",
	"UI/UX",
];

export type NewsletterFormInput = {
	email: string;
	first_name?: string;
	last_name?: string;
	from_url?: string;
};

export type ViewInput = {
	slug: string;
	type: ViewType;
};

export type ViewType = "blog" | "page" | "project" | "snippet";

export type SocialType =
	| "twitter"
	| "linkedin"
	| "instagram"
	| "github"
	| "email";

export type PostClickedFrom = "recent" | "suggested" | "previous" | "next";
