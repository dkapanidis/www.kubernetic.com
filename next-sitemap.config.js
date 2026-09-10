/** @type {import('next-sitemap').IConfig} */

module.exports =  {
  generateIndexSitemap: false,
  siteUrl: process.env.SITE_URL || 'https://www.kubernetic.com/',
  generateRobotsTxt: true,
  // Transactional pages: noindex'd, so keep them out of the sitemap too.
  exclude: ['/payment/*'],
}
