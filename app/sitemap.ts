import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://princemuel.vercel.app',
      lastModified: new Date(),
    },
    {
      url: 'https://princemuel.vercel.app/contact',
      lastModified: new Date(),
    },
    {
      url: 'https://princemuel.vercel.app/projects',
      lastModified: new Date(),
    },
  ];
}
