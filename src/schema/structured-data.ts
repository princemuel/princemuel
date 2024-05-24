import AvatarImage from "@/assets/images/placeholder.avif";
import { published_date, urlize } from "@/lib/config";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import type { Person, WebPage, WebSite, WithContext } from "schema-dts";

const __filename = fileURLToPath(import.meta.url);
const output = execSync(`git log -1 --pretty="format:%cI" "${__filename}"`);
const updatedAt = new Date(output.toString().trim() || Date.now());

export const profile_ld = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": urlize("/about-me").toString(),
  url: urlize("/about-me").toString(),
  name: "Prince Muel",
  alternateName: "Samuel Chukwuzube",
  image: {
    "@type": "ImageObject",
    inLanguage: "en-US",
    "@id": urlize(AvatarImage.src).toString(),
    url: urlize(AvatarImage.src).toString(),
    contentUrl: urlize(AvatarImage.src).toString(),
    caption: "Prince Muel",
  },
  description: "Muel is a frontend engineer. ",
  sameAs: [
    "https://www.facebook.com/mikeychuks",
    "https://x.com/iamprincemuel/",
    "https://www.instagram.com/iamprincemuel/",
    "https://www.pinterest.com/iamprincemuel/",
    "https://github.com/princemuel",
    "https://www.youtube.com/princemuel",
  ],
  gender: "male",
  knowsAbout: [
    "Software Engineering",
    "Web Development",
    "Search Engine Optimization",
    "Web Accessibility",
    "Music Theory and Perfomance",
  ],
  knowsLanguage: ["English", "French", "Igbo", "Yoruba"],
  jobTitle: "Frontend Developer",
  worksFor: {
    "@type": "Organization",
    "@id": "https://childrensmultilingualschool.com/",
    url: "https://childrensmultilingualschool.com/",
    name: "Children's Multilingual School",
  },
} satisfies WithContext<Person>;

export const home_ld = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": urlize("/").toString(),
  url: urlize("/").toString(),
  name: "Prince Muel",
  description: "",
  publisher: { "@id": urlize("/").toString() },
  datePublished: published_date.toISOString(),
  dateModified: updatedAt.toISOString(),
  inLanguage: "en-US",
  potentialAction: [
    {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: urlize("?s={search_term}").toString(),
      },
      query: "required name=search_term",
    },
  ],
  copyrightHolder: { "@id": urlize("/about-me").toString() },
} satisfies WithContext<WebSite>;

export const blog_ld = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": urlize("/blog").toString(),
  url: urlize("/blog").toString(),
  name: "Blog - Prince Muel",
  description:
    "Sometimes my general thoughts and rambles but more often these posts follow my experimentation, learning, and front-end development discoveries that are worth a share with the world. All feedback is always welcome.",
  isPartOf: { "@id": urlize("/blog").toString() },
  primaryImageOfPage: { "@id": urlize(AvatarImage.src).toString() },
  image: { "@id": urlize(AvatarImage.src).toString() },
  datePublished: published_date.toISOString(),
  dateModified: updatedAt.toISOString(),
  inLanguage: "en-US",
  potentialAction: [
    { "@type": "DiscoverAction", target: urlize("/blog").toString() },
  ],
} satisfies WithContext<WebPage>;
