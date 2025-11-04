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
    // Fix pro Node 17+ / OpenSSL 3: vyhneme se MD4 a použijeme xxhash64
    if (config.output) {
      config.output.hashFunction = 'xxhash64'
    }
    return config
  },
})
