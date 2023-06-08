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

        source: 'https://www.15zisif.cz/co-je-to-minifond/',

        destination: 'https://www.15zisif.cz/co-je-to-alternativni-investicni-fond',

        permanent: true,

      }

    ]

  }

}
