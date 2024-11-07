import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import AvatarImage from "@/assets/images/placeholder.avif";
import { withBaseUrl } from "@/helpers/with-base-url";
import { invariant } from "outvariant";
import type { Person, WebPage, WebSite, WithContext } from "schema-dts";
import { published_date } from "../config/settings";

const updatedAt = (() => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const timeBuffer = execSync(
      `git log -1 --pretty="format:%cI" "${__filename}"`,
    );
    invariant(timeBuffer.toString().trim(), "Invalid DateTimeFormat");
    return new Date(timeBuffer.toString().trim());
  } catch {
    return new Date();
  }
})();

export const profile_ld = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": withBaseUrl("/about-me").toString(),
  url: withBaseUrl("/about-me").toString(),
  name: "Prince Muel",
  alternateName: "Samuel Chukwuzube",
  image: {
    "@type": "ImageObject",
    inLanguage: "en-US",
    "@id": withBaseUrl(AvatarImage.src).toString(),
    url: withBaseUrl(AvatarImage.src).toString(),
    contentUrl: withBaseUrl(AvatarImage.src).toString(),
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
  "@id": withBaseUrl("/").toString(),
  url: withBaseUrl("/").toString(),
  name: "Prince Muel",
  description: "",
  publisher: { "@id": withBaseUrl("/").toString() },
  datePublished: published_date.toISOString(),
  dateModified: updatedAt.toISOString(),
  inLanguage: "en-US",
  potentialAction: [
    {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: withBaseUrl("?s={search_term}").toString(),
      },
      query: "required name=search_term",
    },
  ],
  copyrightHolder: { "@id": withBaseUrl("/about-me").toString() },
} satisfies WithContext<WebSite>;

export const blog_ld = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": withBaseUrl("/blog").toString(),
  url: withBaseUrl("/blog").toString(),
  name: "Blog - Prince Muel",
  description:
    "Sometimes my general thoughts and rambles but more often these posts follow my experimentation, learning, and front-end development discoveries that are worth a share with the world. All feedback is always welcome.",
  isPartOf: { "@id": withBaseUrl("/blog").toString() },
  primaryImageOfPage: { "@id": withBaseUrl(AvatarImage.src).toString() },
  image: { "@id": withBaseUrl(AvatarImage.src).toString() },
  datePublished: published_date.toISOString(),
  dateModified: updatedAt.toISOString(),
  inLanguage: "en-US",
  potentialAction: [
    { "@type": "DiscoverAction", target: withBaseUrl("/blog").toString() },
  ],
} satisfies WithContext<WebPage>;
