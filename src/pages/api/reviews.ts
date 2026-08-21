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

const buildPayload = (data: any): ReviewsPayload => ({
	rating: typeof data?.rating === 'number' ? data.rating : null,
	totalCount: typeof data?.userRatingCount === 'number' ? data.userRatingCount : null,
	mapsUri: data?.googleMapsUri || null,
	placeId: PLACE_ID,
	reviews: (data?.reviews || [])
		// keep only five-star reviews that actually say something
		.filter((review: any) => review?.rating === 5 && (review?.text?.text || review?.originalText?.text))
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
