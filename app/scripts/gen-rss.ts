import { Author, Feed, type FeedOptions } from 'feed';
import fs, { promises as ps } from 'fs';
import { getArticlesMetadata } from '../content';

const SITE_URL = process.env.SITE_URL || '';
const baseUrl = new URL('/', SITE_URL).href;

console.log(ps.constants);
console.log(fs.constants);

const author: Author = {
  name: 'Prince Muel',
  email: 'vansomecsam@gmail.com',
  link: baseUrl,
};

const copyright = `All rights reserved © ${new Date().getFullYear()} Prince Muel`;

async function generate() {
  const t0 = performance.now();
  console.log('generating rss');

  const articles = await getArticlesMetadata();

  const options: FeedOptions = {
    title: "RSS Feed - Prince Muel's Blog",
    description: "Prince Muel's personal blog website",
    id: baseUrl,
    link: baseUrl,
    image: `${baseUrl}/opengraph-image.png`,
    favicon: `${baseUrl}/favicon.ico`,
    updated: new Date(),
    generator: 'Feed for Node.js',
    language: 'en-US',
    feedLinks: {
      rss2: `${baseUrl}/feed.xml`,
      json: `${baseUrl}/rss.json`,
      atom: `${baseUrl}/atom.xml`,
    },
    author,
    copyright,
  };
  const feed = new Feed(options);

  for (const article of articles) {
    feed.addItem({
      id: `${baseUrl}/articles/${article.id}`,
      link: `${baseUrl}/articles/${article.id}`,
      title: article.title,
      description: article.description,
      content: article.description,
      image: article.image,
      audio: article.audio,
      video: article.video,
      date: new Date(article.date),
      published: new Date(article.date),
      author: [article.author || author],
      contributor: article.contributors,
      copyright,
    });
  }

  await ps.writeFile('./public/feed.xml', feed.rss2());
  await ps.writeFile('./public/atom.xml', feed.atom1());
  await ps.writeFile('./public/rss.json', feed.json1());

  console.log('rss generated');

  const t1 = performance.now();
  console.log(`Rss Generation took ${t1 - t0} milliseconds.`);
}

generate().catch((e) => console.log(e.message));
