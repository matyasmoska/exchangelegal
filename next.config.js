const withMDX = require('@next/mdx')()

/** @type {import('next').NextConfig} */
module.exports = withMDX({
  images: {
    domains: ['images.ctfassets.net'],
  },
  i18n: {
    locales: ['cs', 'en'],
    defaultLocale: 'cs',
  },
  async redirects() {
    return [
      {
        source: '/co-je-to-minifond',
        destination: '/alternativni-investicni-fond',
        permanent: true,
      },
      {
        source: '/co-je-to-alternativni-investicni-fond',
        destination: '/alternativni-investicni-fond',
        permanent: true,
      },
    ]
  },
  webpack: (config) => {
    // Fix pro Node 17+ / OpenSSL 3:
    // 1) Přepnout hash z MD4 na xxhash64
    if (config.output) {
      config.output.hashFunction = 'xxhash64'
    }
    // 2) Vypnout RealContentHash plugin (ten by jinak mohl MD4 stále použít)
    if (!config.optimization) config.optimization = {}
    config.optimization.realContentHash = false

    return config
  },
})
