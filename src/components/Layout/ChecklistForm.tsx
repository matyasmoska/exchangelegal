import React, { FC, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { c } from '../../services/misc'
import { useTranslations } from '../../hooks/useTranslations'
import data from '../../data/checklist.json'

type Status = 'idle' | 'loading' | 'success' | 'error'

/**
 * Lead magnet: the visitor leaves an e-mail address and marketing consent and
 * the checklist PDF is sent automatically by /api/checklist.
 */
const ChecklistForm: FC = () => {
	const t = useTranslations<string>()
	const { locale } = useRouter()

	const [email, setEmail] = useState('')
	const [consent, setConsent] = useState(false)
	// honeypot: hidden from people, tempting for bots
	const [company, setCompany] = useState('')
	const [status, setStatus] = useState<Status>('idle')
	const [message, setMessage] = useState('')

	const submit = async () => {
		if (status === 'loading') return

		if (!consent) {
			setStatus('error')
			setMessage(t(data.errorConsent))
			return
		}

		setStatus('loading')

		try {
			const response = await fetch('/api/checklist', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, consent, consentText: t(data.consent), locale, company }),
			})

			if (!response.ok) {
				const payload = await response.json().catch(() => null)
				setStatus('error')
				setMessage(payload?.error?.code === 'invalid_email' ? t(data.errorEmail) : t(data.errorGeneric))
				return
			}

			const payload = await response.json().catch(() => null)
			setStatus('success')
			setMessage(payload?.status === 'sent_recently' ? t(data.successRecent) : t(data.success))
			setEmail('')
			setConsent(false)
		} catch (error) {
			setStatus('error')
			setMessage(t(data.errorGeneric))
		}
	}

	return (
		<section id="checklist" className={c('w-full bg-dark-blue text-white', 'my-8')}>
			<div className={c('max-w-4xl mx-auto px-8 py-12 space-y-5 text-center', 'md:px-6 md:py-10')}>
				<p className="text-xs font-semibold tracking-widest uppercase text-mint">{t(data.badge)}</p>
				<h2 className={c('text-3xl font-bold leading-snug', 'md:text-2xl')}>{t(data.title)}</h2>
				<p className={c('max-w-2xl mx-auto text-sm leading-relaxed opacity-80', 'text-left md:text-justify')}>
					{t(data.description)}
				</p>

				{status === 'success' ? (
					<p className="text-sm font-semibold text-mint">{message}</p>
				) : (
					<div className="max-w-xl mx-auto space-y-3 text-left">
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
									'focus:outline-none focus:ring-2 focus:ring-mint'
								)}
							/>
							<button
								type="button"
								onClick={submit}
								disabled={status === 'loading'}
								className={c(
									'px-5 py-2 rounded-md font-semibold whitespace-nowrap transition',
									'bg-mint text-dark-blue hover:bg-mint-dark disabled:opacity-60'
								)}
							>
								{status === 'loading' ? t(data.sending) : t(data.button)}
							</button>
						</div>

						{/* honeypot: visually hidden, never filled in by people */}
						<input
							type="text"
							value={company}
							onChange={(event) => setCompany(event.target.value)}
							name="company"
							autoComplete="off"
							tabIndex={-1}
							aria-hidden="true"
							className="hidden"
						/>

						<label className="flex items-start gap-2 text-xs leading-relaxed cursor-pointer opacity-80">
							<input
								type="checkbox"
								checked={consent}
								onChange={(event) => setConsent(event.target.checked)}
								className="mt-0.5 rounded text-mint focus:ring-mint"
							/>
							<span>
								{t(data.consent)}{' '}
								<Link href="/zasady-zpracovani-osobnich-udaju">
									<a className="underline hover:text-mint" target="_blank" rel="noopener noreferrer">
										{t(data.privacyLink)}
									</a>
								</Link>
								.
							</span>
						</label>

						{status === 'error' && <p className="text-sm font-semibold text-[#FFB4AE]">{message}</p>}
					</div>
				)}
			</div>
		</section>
	)
}

export default ChecklistForm
