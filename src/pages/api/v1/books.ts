import { request } from "@/helpers";
import type { APIRoute } from "astro";

const titleOrISBN = "first to die";

export const GET: APIRoute = async () => {
  const apiUrl = "https://www.googleapis.com/books/v1/volumes";
  const queryParams = new URLSearchParams({ q: titleOrISBN });

  try {
    const response = request(`${apiUrl}?${queryParams}`);

    console.log(response);
    return Response.json({ books: "books" });
  } catch (error) {
    return new Response("Error", { status: 500 });
  }
};

// const book_format = z.object({
//   isAvailable: z.boolean(),
// });

// const bookSchema = z.object({
//   kind: z.string(),
//   id: z.string(),
//   etag: z.string(),
//   selfLink: z.string(),
//   volumeInfo: z.object({
//     title: z.string(),
//     authors: z.array(z.string()),
//     publisher: z.string(),
//     publishedDate: z.string(),
//     description: z.string(),
//     industryIdentifiers: z.array(z.array(z.any())),
//     readingModes: z.object({
//       text: z.boolean(),
//       image: z.boolean(),
//     }),
//     pageCount: z.number(),
//     printType: z.string(),
//     categories: z.array(z.string()),
//     averageRating: z.number(),
//     ratingsCount: z.number(),
//     maturityRating: z.string(),
//     allowAnonLogging: z.boolean(),
//     contentVersion: z.string(),
//     panelizationSummary: z.object({
//       containsEpubBubbles: z.boolean(),
//       containsImageBubbles: z.boolean(),
//     }),
//     imageLinks: z.object({
//       smallThumbnail: z.string(),
//       thumbnail: z.string(),
//     }),
//     language: z.string(),
//     previewLink: z.string(),
//     infoLink: z.string(),
//     canonicalVolumeLink: z.string(),
//   }),
//   saleInfo: z.object({
//     country: z.string(),
//     saleability: z.string(),
//     isEbook: z.boolean(),
//   }),
//   accessInfo: z.object({
//     country: z.string(),
//     viewability: z.string(),
//     embeddable: z.boolean(),
//     publicDomain: z.boolean(),
//     textToSpeechPermission: z.string(),
//     epub: book_format,
//     pdf: book_format,
//     webReaderLink: z.string(),
//     accessViewStatus: z.string(),
//     quoteSharingAllowed: z.boolean(),
//   }),
//   searchInfo: z.object({
//     textSnippet: z.string(),
//   }),
// });
