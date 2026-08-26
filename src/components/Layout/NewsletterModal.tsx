import React, { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import Modal from './Modal'
import NewsletterForm from './NewsletterForm'
import { consentName } from './CookieBar'
import { useTranslations } from '../../hooks/useTranslations'
import contactPageData from '../../data/contact.json'

const STATE_COOKIE = 'newsletter-modal'

// Shown only once the visitor is actually reading: after a delay or once they
// scroll past half the page, whichever comes first.
const DELAY_MS = 30000
const SCROLL_RATIO = 0.5

// pause after the visitor passes a marked section
const AFTER_GATE_MS = 1500

// How long we stay quiet after the visitor closes it or signs up.
const DISMISS_DAYS = 30
const SUBSCRIBED_DAYS = 365

// Pages where an overlay would get in the way or be inappropriate.
const EXCLUDED_PATHS = [
	'/dekujeme',
	'/zasady-zpracovani-osobnich-udaju',
	'/pravni-informace-a-podminky-uziti',
	'/pravidla-pouzivani-cookies',
]

const expiresIn = (days: number) => {
	const date = new Date()
	date.setDate(date.getDate() + days)
	return date
}

const NewsletterModal: FC = () => {
	const t = useTranslations<string>()
	const router = useRouter()
	const [cookies, setCookie] = useCookies([STATE_COOKIE, consentName])
	const [open, setOpen] = useState(false)

	const data = contactPageData.newsletter
	const confirmed = router.query.newsletter === 'confirmed'
	const failed = router.query.newsletter === 'error'

	// 1) coming back from the confirmation link - show the result straight away
	useEffect(() => {
		if (!router.isReady) return
		if (confirmed || failed) {
			setOpen(true)
			if (confirmed) setCookie(STATE_COOKIE, 'subscribed', { path: '/', expires: expiresIn(SUBSCRIBED_DAYS), sameSite: 'lax' })
		}
	}, [router.isReady, confirmed, failed])

	// 2) the offer itself
	useEffect(() => {
		if (!router.isReady || confirmed || failed) return
		if (cookies[STATE_COOKIE]) return
		if (EXCLUDED_PATHS.some((path) => router.asPath.startsWith(path))) return

		// never stack two overlays - the cookie bar has priority
		const consentGiven = cookies[consentName] && cookies[consentName] !== 'true'
		if (!consentGiven) return

		let done = false
		let timer = 0

		const show = () => {
			if (done) return
			done = true
			setOpen(true)
			window.removeEventListener('scroll', onScroll)
		}

		// A page may mark a section the visitor should reach first - typically the
		// price list, which interests them far more than a newsletter.
		const gate = document.querySelector('[data-newsletter-gate]')

		const onScroll = () => {
			if (gate) {
				// only once the whole section has scrolled above the viewport
				const passed = gate.getBoundingClientRect().bottom < 0
				if (passed) {
					// short pause so it does not pop up mid-scroll
					timer = window.setTimeout(show, AFTER_GATE_MS)
					window.removeEventListener('scroll', onScroll)
				}
				return
			}

			const scrolled = window.scrollY / Math.max(document.body.scrollHeight - window.innerHeight, 1)
			if (scrolled > SCROLL_RATIO) show()
		}

		// without a gate the plain delay applies; with one, reaching it is the condition
		if (!gate) timer = window.setTimeout(show, DELAY_MS)
		window.addEventListener('scroll', onScroll, { passive: true })
		onScroll()

		return () => {
			window.clearTimeout(timer)
			window.removeEventListener('scroll', onScroll)
		}
	}, [router.isReady, router.asPath, cookies, confirmed, failed])

	const close = () => {
		setOpen(false)
		if (!cookies[STATE_COOKIE]) {
			setCookie(STATE_COOKIE, 'dismissed', { path: '/', expires: expiresIn(DISMISS_DAYS), sameSite: 'lax' })
		}
		if (confirmed || failed) {
			// drop the query parameter so the message does not reappear on reload
			router.replace(router.asPath.split('?')[0], undefined, { shallow: true, scroll: false })
		}
	}

	const markSubscribed = () =>
		setCookie(STATE_COOKIE, 'subscribed', { path: '/', expires: expiresIn(SUBSCRIBED_DAYS), sameSite: 'lax' })

	if (confirmed || failed) {
		return (
			<Modal open={open} onClose={close} title={t(confirmed ? data.confirmedTitle : data.confirmErrorTitle)} className="rounded-2xl max-w-lg">
				<p className="leading-relaxed">{t(confirmed ? data.confirmed : data.confirmError)}</p>
			</Modal>
		)
	}

	return (
		<Modal open={open} onClose={close} title={t(data.title)} className="rounded-2xl max-w-lg">
			<NewsletterForm variant="modal" onSubscribed={markSubscribed} />
		</Modal>
	)
}

export default NewsletterModal
