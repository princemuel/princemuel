import { Author, Feed, type FeedOptions } from 'feed';
import { getArticlesMetadata } from '../content';

const SITE_URL = process.env.SITE_URL || '';
const baseUrl = SITE_URL;
const currentYear = new Date().getFullYear();

const author: Author = {
  name: 'Prince Muel',
  email: 'vansomecsam@gmail.com',
  link: baseUrl,
};

const copyright = `All rights reserved © ${currentYear} Prince Muel`;

export async function feed() {
  const articles = await getArticlesMetadata();

  const options: FeedOptions = {
    title: "RSS Feed - Prince Muel's Blog",
    description: "Prince Muel's Personal Blog Website",
    id: baseUrl,
    link: baseUrl,
    image: `${baseUrl}/opengraph-image.png`,
    favicon: `${baseUrl}/favicon.ico`,
    updated: new Date(),
    generator: 'Feed for Node.js',
    language: 'en-US',
    feedLinks: {
      rss2: `${baseUrl}/feed.xml`,
      json: `${baseUrl}/feed.json`,
      atom: `${baseUrl}/atom1.xml`,
    },
    author,
    copyright,
  };

  const data = new Feed(options);
  for (const article of articles) {
    data.addItem({
      id: `${baseUrl}/articles/${article.id}`,
      link: `${baseUrl}/articles/${article.id}`,
      title: article.title,
      description: article.description,
      content: article.description,
      image: article.media?.image,
      audio: article.media?.audio,
      video: article.media?.video,
      date: new Date(),
      published: new Date(article.publishedAt),
      author: [article.author || author],
      contributor: article.contributors,
      copyright,
    });
  }

  const path = process.cwd() + '/public';
  return [path, data] as const;
}
