import React, { FC, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { c } from '../../services/misc'
import { useTranslations } from '../../hooks/useTranslations'
import contactPageData from '../../data/contact.json'

type Status = 'idle' | 'loading' | 'success' | 'error'

const NewsletterForm: FC<{ variant?: 'footer' | 'modal'; onSubscribed?: () => void }> = ({
	variant = 'footer',
	onSubscribed,
}) => {
	const onDark = variant === 'footer'
	const t = useTranslations<string>()
	const router = useRouter()
	const { locale } = router

	const [email, setEmail] = useState('')
	const [consent, setConsent] = useState(false)
	const [status, setStatus] = useState<Status>('idle')
	const [message, setMessage] = useState('')

	// feedback after returning from the confirmation link
	useEffect(() => {
		if (!router.isReady) return
		if (router.query.newsletter === 'confirmed') {
			setStatus('success')
			setMessage(t(data.confirmed))
		}
		if (router.query.newsletter === 'error') {
			setStatus('error')
			setMessage(t(data.confirmError))
		}
	}, [router.isReady, router.query.newsletter])

	const data = contactPageData.newsletter

	const submit = async () => {
		if (status === 'loading') return

		if (!consent) {
			setStatus('error')
			setMessage(t(data.errorConsent))
			return
		}

		setStatus('loading')

		try {
			const response = await fetch('/api/newsletter', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, consent, consentText: t(data.consent), locale }),
			})

			if (!response.ok) {
				const payload = await response.json().catch(() => null)
				setStatus('error')
				setMessage(payload?.error?.code === 'invalid_email' ? t(data.errorEmail) : t(data.errorGeneric))
				return
			}

			const payload = await response.json().catch(() => null)
			setStatus('success')
			// the address is stored either way; the wording differs if the e-mail failed
			setMessage(payload?.mailed === false ? t(data.successNoMail) : t(data.success))
			onSubscribed?.()
			setEmail('')
			setConsent(false)
		} catch (error) {
			setStatus('error')
			setMessage(t(data.errorGeneric))
		}
	}

	return (
		<div className={c('space-y-4', onDark ? 'max-w-sm md:mx-auto' : 'w-full')}>
			{onDark && <h3 className="font-semibold text-lg">{t(data.title)}</h3>}
			<p className={c('text-sm leading-relaxed', onDark ? 'opacity-80' : 'text-warm-grey')}>{t(data.description)}</p>

			{status === 'success' ? (
				<p className={c('text-sm font-semibold', onDark ? 'text-mint' : 'text-ok')}>{message}</p>
			) : (
				<div className="space-y-3">
					<div className={c('flex gap-2', 'md:flex-col')}>
						<input
							type="email"
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							onKeyDown={(event) => event.key === 'Enter' && submit()}
							placeholder={t(data.placeholder)}
							aria-label={t(data.placeholder)}
							className={c(
								'flex-grow min-w-0 px-3 py-2 rounded-md text-dark-blue placeholder-warm-grey',
								!onDark && 'border border-dark-grey',
								'focus:outline-none focus:ring-2 focus:ring-mint'
							)}
						/>
						<button
							type="button"
							onClick={submit}
							disabled={status === 'loading'}
							className={c(
								'px-4 py-2 rounded-md font-semibold whitespace-nowrap transition',
								onDark ? 'bg-mint text-dark-blue hover:bg-mint-dark disabled:opacity-60' : 'bg-dark-blue text-white hover:bg-wine-primary-hover disabled:opacity-60'
							)}
						>
							{status === 'loading' ? t(data.sending) : t(data.button)}
						</button>
					</div>

					<label className={c('flex items-start gap-2 text-xs leading-relaxed cursor-pointer', onDark ? 'opacity-80' : 'text-warm-grey')}>
						<input
							type="checkbox"
							checked={consent}
							onChange={(event) => setConsent(event.target.checked)}
							className="mt-0.5 flex-shrink-0 accent-mint w-4 h-4"
						/>
						<span>
							{t(data.consent)}{' '}
							<Link href="/zasady-zpracovani-osobnich-udaju">
								<a className="underline">{t(data.privacyLink)}</a>
							</Link>
						</span>
					</label>

					{status === 'error' && <p className={c('text-sm font-semibold', onDark ? 'text-mint-dark' : 'text-no')}>{message}</p>}
				</div>
			)}
		</div>
	)
}

export default NewsletterForm
