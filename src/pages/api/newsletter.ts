import type { NextApiRequest, NextApiResponse } from 'next'
import { randomUUID } from 'crypto'
import nodemailer from 'nodemailer'

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

// How long a confirmation link stays valid, and how long we wait before sending another one.
const TOKEN_TTL_MS = 14 * 24 * 60 * 60 * 1000
const RESEND_COOLDOWN_MS = 10 * 60 * 1000

const siteUrl = (process.env.SITE_URL || 'https://www.pravoprosmenarny.cz').replace(/\/$/, '')

// Double opt-in: the address is only activated once the owner clicks the link,
// which is what proves the consent came from them and not from a third party.
const sendConfirmation = async (email: string, token: string, locale: 'cs' | 'en') => {
	const port = Number(process.env.SMTP_PORT || 465)
	// newsletters go out under their own address; falls back to the form sender
	const from = (process.env.NEWSLETTER_FROM_EMAIL || process.env.SEND_FROM_EMAIL || process.env.SMTP_USER || '').trim()

	const transporter = nodemailer.createTransport({
		host: process.env.SMTP_SERVER,
		port,
		secure: port === 465,
		auth: {
			user: process.env.NEWSLETTER_SMTP_USER || process.env.SMTP_USER,
			pass: process.env.NEWSLETTER_SMTP_PASSWORD || process.env.SMTP_PASSWORD,
		},
	})

	const link = `${siteUrl}/api/newsletter/confirm?token=${token}&email=${encodeURIComponent(email)}`

	const texts = locale === 'en'
		? {
			subject: 'Please confirm your subscription to regulatory updates',
			heading: 'Confirm your subscription',
			intro: 'Please confirm that you want to receive regulatory updates for exchange offices at this address.',
			what: 'We send an overview of changes in bureau-de-change regulation, AML duties and CNB enforcement practice roughly once a quarter, and only when there is something worth reporting.',
			button: 'Confirm subscription',
			fallback: 'If the button does not work, paste this address into your browser:',
			ignore: 'If you did not request this, simply ignore this message. Without confirmation we will not send you anything.',
			privacy: 'Privacy Policy',
		}
		: {
			subject: 'Potvrďte prosím odběr regulatorních novinek',
			heading: 'Potvrzení odběru',
			intro: 'Potvrďte prosím, že na této adrese chcete dostávat regulatorní novinky pro směnárny.',
			what: 'Přehled změn v regulaci směnárenské činnosti, AML povinností a sankční praxe ČNB posíláme přibližně jednou za čtvrtletí, a to pouze když je o čem psát.',
			button: 'Potvrdit odběr',
			fallback: 'Pokud tlačítko nefunguje, vložte do prohlížeče tuto adresu:',
			ignore: 'Pokud jste o odběr nežádali, tuto zprávu ignorujte. Bez potvrzení Vám nic posílat nebudeme.',
			privacy: 'Zásady zpracování osobních údajů',
		}

	// table layout with inline styles - the only thing e-mail clients render reliably
	const html = `
<!doctype html>
<html lang="${locale}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${texts.subject}</title></head>
<body style="margin:0;padding:0;background:#f5f6f8;">
	<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f6f8;padding:24px 12px;">
		<tr><td align="center">
			<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:10px;overflow:hidden;border:1px solid #e3e6ea;">
				<tr>
					<td style="padding:28px 32px 8px 32px;">
						<img src="${siteUrl}/images/email-logo.png" width="180" alt="PEERS advokátní kancelář" style="display:block;border:0;width:180px;height:auto;">
					</td>
				</tr>
				<tr>
					<td style="padding:8px 32px 0 32px;font-family:Georgia,'Times New Roman',serif;color:#110756;font-size:22px;font-weight:bold;">
						${texts.heading}
					</td>
				</tr>
				<tr>
					<td style="padding:12px 32px 0 32px;font-family:Arial,Helvetica,sans-serif;color:#333333;font-size:15px;line-height:1.6;">
						<p style="margin:0 0 12px 0;">${texts.intro}</p>
						<p style="margin:0;color:#5C6B7A;font-size:14px;">${texts.what}</p>
					</td>
				</tr>
				<tr>
					<td style="padding:24px 32px 8px 32px;">
						<table role="presentation" cellpadding="0" cellspacing="0"><tr>
							<td style="background:#110756;border-radius:6px;">
								<a href="${link}" style="display:inline-block;padding:13px 26px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;color:#ffffff;text-decoration:none;">${texts.button}</a>
							</td>
						</tr></table>
					</td>
				</tr>
				<tr>
					<td style="padding:8px 32px 24px 32px;font-family:Arial,Helvetica,sans-serif;color:#8a8f98;font-size:12px;line-height:1.6;">
						<p style="margin:0 0 6px 0;">${texts.fallback}</p>
						<p style="margin:0 0 12px 0;word-break:break-all;"><a href="${link}" style="color:#4A7FB5;">${link}</a></p>
						<p style="margin:0;">${texts.ignore}</p>
					</td>
				</tr>
				<tr>
					<td style="padding:18px 32px 26px 32px;border-top:1px solid #e3e6ea;font-family:Arial,Helvetica,sans-serif;color:#8a8f98;font-size:12px;line-height:1.6;">
						<strong style="color:#5C6B7A;">PEERS advokátní kancelář, s.r.o.</strong><br>
						IČO 220 96 973, sp. zn. C 410891 vedená u Městského soudu v Praze<br>
						City Tower, Hvězdova 1716/2b, Nusle, 140 00 Praha 4<br>
						<a href="${siteUrl}" style="color:#4A7FB5;">pravoprosmenarny.cz</a> &nbsp;|&nbsp;
						<a href="${siteUrl}/zasady-zpracovani-osobnich-udaju" style="color:#4A7FB5;">${texts.privacy}</a>
					</td>
				</tr>
			</table>
		</td></tr>
	</table>
</body>
</html>`

	// plain-text alternative improves deliverability and covers clients without HTML
	const text = [texts.intro, '', texts.what, '', `${texts.button}: ${link}`, '', texts.ignore, '',
		'PEERS advokátní kancelář, s.r.o., IČO 220 96 973, City Tower, Hvězdova 1716/2b, Nusle, 140 00 Praha 4'].join('\n')

	await transporter.sendMail({ from, to: email, subject: texts.subject, html, text })
}

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

		// imported lazily so that validation errors are returned as JSON even if
		// the Firebase credentials are missing or malformed
		const db = (await import('../../services/firebase')).default
		const ref = db.collection('newsletter').doc(email)
		const existing = await ref.get()
		const previous = existing.exists ? existing.data() || {} : null

		// Already confirmed: never reset the record, that would silently
		// unsubscribe someone who simply signed up twice.
		if (previous?.confirmed) {
			await ref.set({ updatedAt: now, lastSignupAt: now }, { merge: true })
			return res.status(200).json({ ok: true, status: 'already_confirmed' })
		}

		// A pending sign-up keeps its token, so links from earlier e-mails
		// stay valid and cannot invalidate one another.
		const pendingSince = previous?.tokenIssuedAt?.toDate?.() ?? null
		const tokenStillValid =
			previous?.token && pendingSince && now.getTime() - pendingSince.getTime() < TOKEN_TTL_MS

		const token = tokenStillValid ? previous.token : randomUUID()

		const document = {
			email,
			locale,
			source: String(body?.source || 'footer'),
			// the subscription only becomes active after the address is confirmed
			active: false,
			confirmed: false,
			token,
			tokenIssuedAt: tokenStillValid ? previous.tokenIssuedAt : now,
			subscribedAt: previous?.subscribedAt ?? now,
			updatedAt: now,
			consent: {
				given: true,
				version: CONSENT_VERSION,
				text: consentText,
				ip,
				userAgent: String(req.headers['user-agent'] || '').slice(0, 500),
			},
		}

		await ref.set(document, { merge: true })

		// Do not spam the inbox when someone submits the form twice in a row.
		const lastMailedAt = previous?.mailedAt?.toDate?.() ?? null
		if (lastMailedAt && now.getTime() - lastMailedAt.getTime() < RESEND_COOLDOWN_MS) {
			return res.status(200).json({ ok: true, status: 'pending_recent' })
		}

		try {
			await sendConfirmation(email, token, locale)
			await ref.set({ mailedAt: now }, { merge: true })
		} catch (error) {
			// the address is stored either way; only the confirmation failed
			console.error('Confirmation e-mail could not be sent', error)
			return res.status(200).json({ ok: true, status: 'not_mailed', mailed: false })
		}

		return res.status(200).json({ ok: true, status: 'sent', mailed: true })
	} catch (error) {
		console.error('Newsletter subscription failed', error)
		return res.status(500).json({ error: { code: 'server_error' } })
	}
}

export default handler
