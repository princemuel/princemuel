// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "Prince Muel | Personal Portfolio Website Template";
export const SITE_DESCRIPTION = "";
export const GENERATE_SLUG_FROM_TITLE = true;
export const ENABLE_TRANSITIONS_API = true;
export const DEFAULT_SITE_THEME = "dark";
export const delimiter = "|";

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

export const recentPostsLimit = 4;

export const heroImages = [
  {
    jpg: "/static/images/hero-image-1.jpg",
    webp: "/static/images/hero-image-1.webp",
  },
  {
    jpg: "/static/images/hero-image-2.jpg",
    webp: "/static/images/hero-image-2.webp",
  },
  {
    jpg: "/static/images/hero-image-3.jpg",
    webp: "/static/images/hero-image-3.webp",
  },
  {
    jpg: "/static/images/hero-image-4.jpg",
    webp: "/static/images/hero-image-4.webp",
  },
  {
    jpg: "/static/images/hero-image-5.jpg",
    webp: "/static/images/hero-image-5.webp",
  },
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
