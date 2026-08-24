import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * Stores newsletter subscriptions in the Firestore collection "newsletter".
 * The document id is the normalised e-mail, so repeated sign-ups update the
 * existing record instead of creating duplicates.
 *
 * Alongside the address we keep proof of consent (wording, version, time,
 * IP address), which is what we would need to show if a subscriber ever
 * disputed that they signed up.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const CONSENT_VERSION = '2026-08'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'POST') {
		res.setHeader('Allow', ['POST'])
		return res.status(405).json({ error: { message: 'Method not allowed' } })
	}

	try {
		const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
		const email = String(body?.email || '').trim().toLowerCase()
		const consent = Boolean(body?.consent)
		const consentText = String(body?.consentText || '').slice(0, 1000)
		const locale = body?.locale === 'en' ? 'en' : 'cs'

		if (!EMAIL_PATTERN.test(email)) {
			return res.status(400).json({ error: { code: 'invalid_email' } })
		}

		if (!consent) {
			return res.status(400).json({ error: { code: 'consent_required' } })
		}

		const forwarded = req.headers['x-forwarded-for']
		const ip = (Array.isArray(forwarded) ? forwarded[0] : forwarded || '').split(',')[0].trim() || null

		const now = new Date()
		const document = {
			email,
			locale,
			source: 'footer',
			active: true,
			subscribedAt: now,
			updatedAt: now,
			consent: {
				given: true,
				version: CONSENT_VERSION,
				text: consentText,
				ip,
				userAgent: String(req.headers['user-agent'] || '').slice(0, 500),
			},
		}

		// imported lazily so that validation errors are returned as JSON even if
		// the Firebase credentials are missing or malformed
		const db = (await import('../../services/firebase')).default
		await db.collection('newsletter').doc(email).set(document, { merge: true })

		return res.status(200).json({ ok: true })
	} catch (error) {
		console.error('Newsletter subscription failed', error)
		return res.status(500).json({ error: { code: 'server_error' } })
	}
}

export default handler
