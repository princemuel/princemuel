export const delimiter = "–";
export const published_date = new Date("2024-02-01T16:43:29.577Z");

export function getSiteSettings() {
  return {
    id: "settings",
    /** The site title*/
    name: "Prince Muel",
    /** A human-readable description of the site*/
    description: "",
    /** The site's default language as a string, e.g. `"en-US"`*/
    language: "en" as ["en", "fr", "es"][number],
    /** The site's timezone as a string, e.g. `"Europe/Paris"`*/
    timezone_string: "Africa/Lagos",
    /** The site's timezone expressed as an offset in hours from GMT*/
    gmt_offset: 1,
    /** The URL of the site*/
    url: new URL("/", import.meta.env.SITE),
    /** The URL of the site homepage. (Usually the same as `url`)*/
    home: new URL("/", import.meta.env.SITE),
    /** Reference to a media attachment to use as the site icon*/
    site_icon: "",
    /** Reference to a media attachment to use as the site logo*/
    site_logo: "",
    /** URL to a resource to use as the site icon*/
    site_icon_url: "",
    /** The publish date of the site*/
    published_date: new Date("2024-02-01T16:43:29.577Z"),
  };
}

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

export type PostClickedFrom = "recent" | "suggested" | "previous" | "next";
