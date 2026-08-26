import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * Confirms a newsletter subscription. The link in the confirmation e-mail points
 * here; only after it is opened does the record become active. That is what
 * demonstrates the consent was given by the owner of the address.
 */

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const email = String(req.query.email || '').trim().toLowerCase()
	const token = String(req.query.token || '').trim()

	const fail = () => res.redirect(302, '/?newsletter=error')

	if (!email || !token) return fail()

	try {
		const db = (await import('../../../services/firebase')).default
		const ref = db.collection('newsletter').doc(email)
		const snapshot = await ref.get()

		if (!snapshot.exists) return fail()

		const data = snapshot.data() || {}
		// a mismatched token means the link is forged or superseded by a newer sign-up
		if (!data.token || data.token !== token) return fail()

		if (!data.confirmed) {
			const forwarded = req.headers['x-forwarded-for']
			const ip = (Array.isArray(forwarded) ? forwarded[0] : forwarded || '').split(',')[0].trim() || null

			await ref.set(
				{
					confirmed: true,
					active: true,
					confirmedAt: new Date(),
					updatedAt: new Date(),
					confirmation: { ip, userAgent: String(req.headers['user-agent'] || '').slice(0, 500) },
				},
				{ merge: true }
			)
		}

		return res.redirect(302, '/?newsletter=confirmed')
	} catch (error) {
		console.error('Newsletter confirmation failed', error)
		return fail()
	}
}

export default handler
