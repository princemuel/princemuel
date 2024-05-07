import type { Person, WebSite, WithContext } from "schema-dts";

// const schema = {
//   "@context": "https://schema.org",
//   "@type": "ProfilePage",
//   dateCreated: new Date("2024-02-04").toISOString(),
//   dateModified: new Date().toISOString(),
//   mainEntity: {
//     "@type": "Person",
//     name: "Sam Chukwuzube",
//     alternateName: "princemuel",
//     identifier: "123475623",
//     description: "description",
//     image: new URL("/static/favicons/og.png"),
//     sameAs: [
//       "https://www.example.com/real-angelo",
//       "https://example.com/profile/therealangelohuff",
//     ],
//   },
// };
export const blogWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Prince Muel's Blog",

  description:
    "Sometimes general thoughts and rambles but more often these posts follow my experimentation, learning, and front-end development discoveries that are worth a share with the world. All feedback is always welcome.",
  url: new URL("/blog", import.meta.env.SITE).toString(),
  inLanguage: "en_US",
} satisfies WithContext<WebSite>;

export const mainWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Prince Muel - Pesonal Page",
  description:
    "Sometimes my general thoughts and rambles but more often these posts follow my experimentation, learning, and front-end development discoveries that are worth a share with the world. All feedback is always welcome.",
  url: new URL("/", import.meta.env.SITE).toString(),
  inLanguage: "en_US",
} satisfies WithContext<WebSite>;

export const profileSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sam Chukwuzube",
  alternateName: "Prince Muel",
  url: new URL("/", import.meta.env.SITE).toString(),
  image: "",
  sameAs: ["https://www.facebook.com/mikeychuks", "https://example.com/profile/therealangelohuff"],
} satisfies WithContext<Person>;
