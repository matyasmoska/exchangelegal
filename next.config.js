const withMDX = require('@next/mdx')()

module.exports = withMDX({
    images: {
        domains: ['images.ctfassets.net']
    }
}),

{

  async redirects() {

    return [

      {

        source: '/co-je-to-minifond/',

        destination: '/co-je-to-alternativni-investicni-fond',

        permanent: true,

      }

    ]

  }

}
