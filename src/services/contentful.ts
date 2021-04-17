import { ContentfulCollection } from "contentful"

const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_API_KEY

const client = require('contentful').createClient({
  space: space,
  accessToken: accessToken,
})

export async function fetchEntries() {
    const entries = await client.getEntries()
    console.log('ENTRIES', entries)
    if (entries.items) return entries.items
    console.log(`Error getting Entries for news.`)
}