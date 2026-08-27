import type { NextApiRequest, NextApiResponse } from 'next'
import { promises as fs } from 'fs'
import path from 'path'
import nodemailer from 'nodemailer'

/**
 * Lead magnet: the visitor leaves an e-mail address and marketing consent,
 * we store the lead in the Firestore collection "leads" (with proof of the
 * consent wording, version, time, IP and user agent) and immediately send
 * the checklist PDF as an attachment. The office gets a notification about
 * every new lead so it can follow up.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const CONSENT_VERSION = '2026-08'

// Do not send the same mailbox another copy within this window.
const RESEND_COOLDOWN_MS = 10 * 60 * 1000

const PDF_FILE = 'checklist-povoleni-cnb-a-provoz-smenarny.pdf'
const PDF_ATTACHMENT_NAME = 'Checklist_k_povoleni_CNB_a_provozu_smenarny.pdf'

const siteUrl = (process.env.SITE_URL || 'https://www.pravoprosmenarny.cz').replace(/\/$/, '')

const escapeHtml = (value: string) =>
	value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const createTransporter = () => {
	const port = Number(process.env.SMTP_PORT || 465)
	return nodemailer.createTransport({
		host: process.env.SMTP_SERVER,
		port,
		secure: port === 465,
		// auth is optional so the route can be exercised against a local debug SMTP server
		...(process.env.SMTP_USER
			? { auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD } }
			: {}),
	})
}

// The PDF lives in /public. On Vercel the file is read from the deployment
// filesystem; if the serverless bundle does not contain it, we fall back to
// fetching it over HTTP from our own site.
const loadPdf = async (): Promise<Buffer> => {
	try {
		return await fs.readFile(path.join(process.cwd(), 'public', 'docs', PDF_FILE))
	} catch (error) {
		const response = await fetch(`${siteUrl}/docs/${PDF_FILE}`)
		if (!response.ok) throw new Error(`Checklist PDF could not be loaded (${response.status})`)
		return Buffer.from(await response.arrayBuffer())
	}
}

const sendChecklist = async (email: string, locale: 'cs' | 'en', pdf: Buffer) => {
	const from = (process.env.SEND_FROM_EMAIL || process.env.SMTP_USER || '').trim()
	const link = `${siteUrl}/docs/${PDF_FILE}`

	const texts = locale === 'en'
		? {
			subject: 'Your checklist: CNB licence and launching an exchange office',
			heading: 'Your checklist is here',
			intro: 'The checklist for obtaining the CNB licence and launching an exchange office is attached to this e-mail. You can also download it here:',
			button: 'Download the checklist (PDF)',
			next: 'If you would like to go through any of the steps for your specific situation, the introductory 15-minute consultation is free of charge – simply reply to this e-mail.',
			why: 'You received this e-mail because you requested the checklist at pravoprosmenarny.cz. If you no longer wish to be contacted with an offer of our services, just reply to this e-mail.',
			privacy: 'Privacy Policy',
		}
		: {
			subject: 'Váš checklist: povolení ČNB a spuštění směnárny',
			heading: 'Váš checklist je tady',
			intro: 'Checklist k povolení ČNB a spuštění směnárny posíláme v příloze tohoto e-mailu. Stáhnout si jej můžete také zde:',
			button: 'Stáhnout checklist (PDF)',
			next: 'Až budete chtít kterýkoli krok probrat pro Vaši konkrétní situaci, úvodní 15minutová konzultace je zdarma – stačí odpovědět na tento e-mail.',
			why: 'Tento e-mail jste obdrželi na základě žádosti o zaslání checklistu na webu pravoprosmenarny.cz. Pokud si nepřejete, abychom Vás dále kontaktovali s nabídkou služeb, stačí odpovědět na tento e-mail.',
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
						<p style="margin:0;">${texts.intro}</p>
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
					<td style="padding:8px 32px 24px 32px;font-family:Arial,Helvetica,sans-serif;color:#333333;font-size:14px;line-height:1.6;">
						<p style="margin:0;">${texts.next}</p>
					</td>
				</tr>
				<tr>
					<td style="padding:18px 32px 26px 32px;border-top:1px solid #e3e6ea;font-family:Arial,Helvetica,sans-serif;color:#8a8f98;font-size:12px;line-height:1.6;">
						<p style="margin:0 0 12px 0;">${texts.why}</p>
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
	const text = [texts.intro, '', `${texts.button}: ${link}`, '', texts.next, '', texts.why, '',
		'PEERS advokátní kancelář, s.r.o., IČO 220 96 973, City Tower, Hvězdova 1716/2b, Nusle, 140 00 Praha 4'].join('\n')

	await createTransporter().sendMail({
		from,
		to: email,
		subject: texts.subject,
		html,
		text,
		attachments: [{ filename: PDF_ATTACHMENT_NAME, content: pdf, contentType: 'application/pdf' }],
	})
}

// The office should hear about every new lead so it can follow up while the
// interest is fresh. A failure here must not break the visitor's request.
const notifyOffice = async (email: string, locale: string, ip: string | null, consentText: string) => {
	const from = (process.env.SEND_FROM_EMAIL || process.env.SMTP_USER || '').trim()
	const to = (process.env.SEND_TO_EMAIL || process.env.SMTP_USER || '').trim()
	if (!to) return

	await createTransporter().sendMail({
		from,
		to,
		replyTo: email,
		subject: `[pravoprosmenarny.cz Checklist] Nový lead: ${email}`,
		html: `
			<div>
				<h3>Nová žádost o checklist (lead)</h3>
				<ul>
					<li>E-mail: <b>${escapeHtml(email)}</b></li>
					<li>Jazyk: <b>${escapeHtml(locale)}</b></li>
					<li>Čas: <b>${new Date().toISOString()}</b></li>
					<li>IP: <b>${escapeHtml(ip || 'neznámá')}</b></li>
				</ul>
				<p>Udělený souhlas (verze ${CONSENT_VERSION}):</p>
				<p><i>${escapeHtml(consentText)}</i></p>
				<p>Lead je uložen ve Firestore v kolekci <b>leads</b>.</p>
			</div>
		`,
	})
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'POST') {
		res.setHeader('Allow', ['POST'])
		return res.status(405).json({ error: { message: 'Method not allowed' } })
	}

	if (!process.env.SMTP_SERVER) {
		console.error('SMTP is not configured - the checklist could not be sent')
		return res.status(500).json({ error: { code: 'smtp_not_configured' } })
	}

	try {
		const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
		const email = String(body?.email || '').trim().toLowerCase()
		const consent = Boolean(body?.consent)
		const consentText = String(body?.consentText || '').slice(0, 1000)
		const locale = body?.locale === 'en' ? 'en' : 'cs'

		// honeypot: a hidden field real visitors never fill in; bots get a fake success
		if (String(body?.company || '').trim() !== '') {
			return res.status(200).json({ ok: true, status: 'sent' })
		}

		if (!EMAIL_PATTERN.test(email)) {
			return res.status(400).json({ error: { code: 'invalid_email' } })
		}

		if (!consent) {
			return res.status(400).json({ error: { code: 'consent_required' } })
		}

		const forwarded = req.headers['x-forwarded-for']
		const ip = (Array.isArray(forwarded) ? forwarded[0] : forwarded || '').split(',')[0].trim() || null

		const now = new Date()

		// The lead and the proof of consent are stored first; the requester still
		// gets the checklist even if Firestore is temporarily unavailable.
		let recentlySent = false
		try {
			// imported lazily so a missing Firebase config returns JSON instead of crashing the route
			const db = (await import('../../services/firebase')).default
			const ref = db.collection('leads').doc(email)
			const existing = await ref.get()
			const previous = existing.exists ? existing.data() || {} : null

			const lastSentAt = previous?.lastSentAt?.toDate?.() ?? null
			recentlySent = Boolean(lastSentAt && now.getTime() - lastSentAt.getTime() < RESEND_COOLDOWN_MS)

			await ref.set(
				{
					email,
					locale,
					source: 'checklist',
					document: PDF_FILE,
					requestedAt: previous?.requestedAt ?? now,
					updatedAt: now,
					requestCount: (Number(previous?.requestCount) || 0) + 1,
					consent: {
						given: true,
						version: CONSENT_VERSION,
						text: consentText,
						ip,
						userAgent: String(req.headers['user-agent'] || '').slice(0, 500),
					},
				},
				{ merge: true }
			)

			if (!recentlySent) {
				await ref.set({ lastSentAt: now }, { merge: true })
			}
		} catch (error) {
			console.error('Lead could not be stored', error)
		}

		// Do not spam the inbox when someone submits the form twice in a row.
		if (recentlySent) {
			return res.status(200).json({ ok: true, status: 'sent_recently' })
		}

		const pdf = await loadPdf()
		await sendChecklist(email, locale, pdf)

		try {
			await notifyOffice(email, locale, ip, consentText)
		} catch (error) {
			console.error('Office notification could not be sent', error)
		}

		return res.status(200).json({ ok: true, status: 'sent' })
	} catch (error) {
		console.error('Checklist request failed', error)
		return res.status(500).json({ error: { code: 'send_failed' } })
	}
}

export default handler
