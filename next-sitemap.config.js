/** @type {import('next-sitemap').IConfig} */

module.exports =  {
  generateIndexSitemap: false,
  siteUrl: process.env.SITE_URL || 'https://www.kubernetic.com/',
  generateRobotsTxt: true,
  // postbuild runs after the export, so write straight into it.
  outDir: 'out',
  // Transactional pages: noindex'd, so keep them out of the sitemap too.
  exclude: ['/payment/*'],
}
