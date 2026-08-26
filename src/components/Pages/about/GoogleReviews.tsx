import React, { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { c } from '../../../services/misc'
import { useTranslations } from '../../../hooks/useTranslations'
import { StarIcon } from '../../Layout/Icons'
import ReferencesCarousel from './ReferencesCarousel'
import pageData from '../../../data/pages/aboutus.json'
import type { ReviewsPayload } from '../../../pages/api/reviews'

const MAX_LENGTH = 260

const shorten = (text: string) =>
	text.length > MAX_LENGTH ? `${text.slice(0, MAX_LENGTH).replace(/\s+\S*$/, '')}…` : text

const GoogleReviews: FC = () => {
	const { locale } = useRouter()
	const t = useTranslations()
	const [data, setData] = useState<ReviewsPayload | null>(null)

	useEffect(() => {
		fetch(`/api/reviews?locale=${locale}`)
			.then((res) => res.json())
			.then(setData)
			.catch(() => undefined)
	}, [locale])

	// Google reviews when we have them, hand-written references otherwise
	const references = data?.reviews?.length
		? data.reviews.map((review) => ({
				photo: review.authorPhoto || '/images/reference.png',
				reference: shorten(review.text),
				who: [review.authorName, review.relativeTime].filter(Boolean).join(' · '),
		  }))
		: pageData.references

	const reviewsLink = data?.mapsUri || `https://search.google.com/local/reviews?placeid=${data?.placeId || ''}`

	return (
		<div className="flex flex-col items-center space-y-8">
			<ReferencesCarousel references={references} />

			{typeof data?.rating === 'number' && (
				<a
					href={reviewsLink}
					target="_blank"
					rel="noopener noreferrer"
					className={c(
						'flex items-center gap-4 px-6 py-3 rounded-2xl shadow-tile transition',
						'hover:shadow-tilearg'
					)}
				>
					<img src="/images/google-icon.svg" alt="Google" className="w-10 h-10" />
					<div className="text-left">
						<div className="flex items-center gap-2">
							<span className="text-2xl font-semibold leading-none">
								{(Math.floor(data.rating * 10) / 10).toFixed(1)}
							</span>
							<div className="flex items-center gap-1">
								{[0, 1, 2, 3, 4].map((i) => (
									<StarIcon
										key={i}
										type={(data.rating as number) > i ? ((data.rating as number) < i + 1 ? 'h' : 'f') : 'e'}
										className="w-4"
									/>
								))}
							</div>
						</div>
						<p className="text-sm text-warm-grey">
							{data.totalCount} {t(pageData.reviewsOnGoogle)}
						</p>
					</div>
				</a>
			)}
		</div>
	)
}

export default GoogleReviews
