const withMDX = require('@next/mdx')()

module.exports = withMDX({
    future: {
        webpack5: true
    },
    images: {
        domains: ['images.ctfassets.net']
    }
})