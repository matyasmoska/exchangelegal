const withMDX = require('@next/mdx')()

module.exports = withMDX({
    images: {
        domains: ['images.ctfassets.net']
    }
})


module.exports = {

  async redirects() {

    return [

      {

        source: '/co-je-to-minifond/',

        destination: '/co-je-to-alternativni-investicni-fond',

        permanent: true,

      },

    ];

  },

};
