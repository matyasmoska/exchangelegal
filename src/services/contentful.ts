const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_API_KEY!

// Optional: lets several sites share one Contentful space.
// - ENVIRONMENT: a separate environment inside the same space (cleanest separation)
// - CONTENT_TYPE / TAG: filters within one environment
const environment = process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT || 'master'
const contentType = process.env.NEXT_PUBLIC_CONTENTFUL_CONTENT_TYPE
const tag = process.env.NEXT_PUBLIC_CONTENTFUL_TAG

const contentful = require('contentful')

const client = contentful.createClient({
  space: space,
  accessToken: accessToken,
  environment: environment,
})

export async function fetchEntries() {
    const query: Record<string, any> = { locale: '*' }

    if (contentType) query.content_type = contentType
    if (tag) query['metadata.tags.sys.id[in]'] = tag

    const entries = await client.getEntries(query)

    if (entries.items) return entries.items
}
