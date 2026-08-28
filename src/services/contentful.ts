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

const parseDate = (value?: string): number => {
    const timestamp = value ? Date.parse(value) : NaN
    return Number.isNaN(timestamp) ? 0 : timestamp
}

// Datum vydání článku z pole `date` (Contentful Date field).
// Query používá locale: '*', takže hodnota je objekt { cs: ..., en: ... };
// pro jistotu zvládne i obyčejný string. Když pole chybí (jiné content
// typy), spadne to na sys.createdAt — nikdy na sys.updatedAt, aby pozdější
// úprava/re-publish starého článku neměnila pořadí na webu.
const publishedAt = (entry: any): number => {
    const date = entry?.fields?.date
    const raw =
        date && typeof date === 'object'
            ? date.cs ?? date.en ?? Object.values(date)[0]
            : date

    return parseDate(raw as string | undefined) || parseDate(entry?.sys?.createdAt)
}

export async function fetchEntries(): Promise<any[]> {
    const query: Record<string, any> = { locale: '*' }

    if (contentType) query.content_type = contentType
    if (tag) query['metadata.tags.sys.id[in]'] = tag

    const entries = await client.getEntries(query)

    if (!entries.items) return []

    // Řazení striktně podle data vydání článku (nejnovější první),
    // při shodě dat rozhoduje datum vytvoření záznamu.
    return [...entries.items].sort(
        (a: any, b: any) =>
            publishedAt(b) - publishedAt(a) ||
            parseDate(b?.sys?.createdAt) - parseDate(a?.sys?.createdAt)
    )
}
