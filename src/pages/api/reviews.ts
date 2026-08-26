import { NextApiRequest, NextApiResponse } from 'next'

/**
 * Reviews for the firm's Google Business profile via Places API (New).
 *
 * The API key stays on the server. Responses are cached in memory for 24 hours,
 * which means roughly 30 calls a month - far below the free allowance for the
 * Enterprise SKU that review fields fall under - and keeps us within Google's
 * caching rules.
 */

const PLACE_ID = process.env.GOOGLE_PLACE_ID || 'ChIJYYV4jEKjeWgR1NmISDTqUYM'
const CACHE_MS = 24 * 60 * 60 * 1000

export interface GoogleReview {
	id: string
	text: string
	authorName: string
	authorPhoto: string | null
	authorUri: string | null
	relativeTime: string
	rating: number
}

export interface ReviewsPayload {
	rating: number | null
	totalCount: number | null
	mapsUri: string | null
	placeId: string
	reviews: GoogleReview[]
}

const emptyPayload = (): ReviewsPayload => ({
	rating: null,
	totalCount: null,
	mapsUri: null,
	placeId: PLACE_ID,
	reviews: [],
})

const cache: Record<string, { fetchedAt: number; payload: ReviewsPayload }> = {}

/**
 * This site sells a single service line, so reviews that name a different agenda
 * (conveyancing, funds, litigation...) would look out of place next to it.
 * A review is skipped when it mentions any of these. Override with
 * GOOGLE_REVIEW_BLOCKLIST as a comma-separated list.
 */
const DEFAULT_BLOCKLIST = [
	'nemovitost', 'převod bytu', 'koupě bytu', 'prodej bytu', 'pozemek', 'pozemku',
	'kupní smlouv', 'úschov', 'katastr', 'hypotéka', 'hypotéky', 'realitn',
	'fond', 'fondu', 'fondy', 'zisif', 'investiční společnost',
	'rozvod', 'dědic', 'dědick', 'trestní', 'trestního', 'žalob', 'soudní spor',
	'pracovněprávní', 'pracovní právo', 'výpověď', 'exekuc', 'insolven',
	'real estate', 'conveyanc', 'apartment', 'mortgage', 'inheritance', 'divorce',
	'criminal', 'litigation', 'lawsuit', 'employment law',
]

const blocklist = (process.env.GOOGLE_REVIEW_BLOCKLIST || '')
	.split(',')
	.map((term) => term.trim().toLowerCase())
	.filter(Boolean)

const terms = blocklist.length ? blocklist : DEFAULT_BLOCKLIST

// Czech letters count as word characters, so "spolupracovníci" must not trip up "pracovní"
const WORD_CHARS = 'a-z0-9áčďéěíňóřšťúůýž'

const isOffTopic = (text: string) => {
	const haystack = text.toLowerCase()

	return terms.some((term) => {
		const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
		// term must start a word - substrings inside longer words don't count
		return new RegExp(`(^|[^${WORD_CHARS}])${escaped}`, 'i').test(haystack)
	})
}

const buildPayload = (data: any): ReviewsPayload => ({
	rating: typeof data?.rating === 'number' ? data.rating : null,
	totalCount: typeof data?.userRatingCount === 'number' ? data.userRatingCount : null,
	mapsUri: data?.googleMapsUri || null,
	placeId: PLACE_ID,
	reviews: (data?.reviews || [])
		// five stars, some actual text, and nothing tied to a different practice area
		.filter((review: any) => {
			const shown = review?.text?.text || review?.originalText?.text || ''
			// Google translates reviews into the requested language, so the wording differs
			// between locales. Filtering on the original text keeps both versions identical.
			const judged = review?.originalText?.text || review?.text?.text || ''
			return review?.rating === 5 && shown.trim().length > 0 && !isOffTopic(judged)
		})
		.map((review: any) => ({
			id: review.name,
			text: (review.text?.text || review.originalText?.text || '').trim(),
			authorName: review.authorAttribution?.displayName || '',
			authorPhoto: review.authorAttribution?.photoUri || null,
			authorUri: review.authorAttribution?.uri || null,
			relativeTime: review.relativePublishTimeDescription || '',
			rating: review.rating,
		})),
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const languageCode = req.query.locale === 'en' ? 'en' : 'cs'
	const cacheKey = `${PLACE_ID}:${languageCode}`
	const cached = cache[cacheKey]

	res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=172800')

	if (cached && Date.now() - cached.fetchedAt < CACHE_MS) {
		return res.status(200).json(cached.payload)
	}

	const apiKey = process.env.GOOGLE_PLACES_API_KEY
	if (!apiKey) return res.status(200).json(emptyPayload())

	try {
		const response = await fetch(`https://places.googleapis.com/v1/places/${PLACE_ID}?languageCode=${languageCode}`, {
			headers: {
				'X-Goog-Api-Key': apiKey,
				// field mask keeps the request to exactly what we render
				'X-Goog-FieldMask': 'rating,userRatingCount,googleMapsUri,reviews',
			},
		})

		if (!response.ok) {
			// serve a stale copy rather than an empty section
			return res.status(200).json(cached ? cached.payload : emptyPayload())
		}

		const payload = buildPayload(await response.json())
		cache[cacheKey] = { fetchedAt: Date.now(), payload }
		return res.status(200).json(payload)
	} catch (error) {
		return res.status(200).json(cached ? cached.payload : emptyPayload())
	}
}
