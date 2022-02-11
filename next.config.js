// next.config.js
module.exports = {
  webpack5: true,
  experimental: {
    esmExternals: false
  },
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
      }
    ]
  },
}
