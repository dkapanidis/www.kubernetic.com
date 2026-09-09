// next.config.js
module.exports = {
  // allow loading the dev server from this machine's LAN address (phone, other devices)
  allowedDevOrigins: Object.values(require('os').networkInterfaces())
    .flat()
    .filter((i) => i && i.family === 'IPv4' && !i.internal)
    .map((i) => i.address),
  async redirects() {
    return [
      {
        source: '/blog/secure-kubernetic-on-premise-with-pomerium',
        destination: '/blog/secure-kubernetic-on-premises-with-pomerium',
        permanent: true,
      },
      {
        source: '/blog/running-securely-kubernetic-on-premise-with-identity-aware-proxy',
        destination: '/blog/running-securely-kubernetic-on-premises-with-identity-aware-proxy',
        permanent: true,
      },
      {
        source: '/enterprise/trial',
        destination: '/team/trial',
        permanent: true,
      },
    ]
  },
}
