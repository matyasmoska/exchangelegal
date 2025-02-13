const withMDX = require('@next/mdx')()

module.exports = withMDX({
    images: {
        domains: ['images.ctfassets.net']
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
      }
    ]
  }
})
