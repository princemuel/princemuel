//
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://princemuel.vercel.app',
  generateRobotsTxt: true,
  // generateIndexSitemap: false,
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      `${process.env.SITE_URL || 'https://princemuel.vercel.app'}/sitemap.xml`,
      `${
        process.env.SITE_URL || 'https://princemuel.vercel.app'
      }/server-sitemap.xml`,
    ],
  },
};
