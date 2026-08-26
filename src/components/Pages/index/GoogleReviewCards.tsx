import React, { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { c } from '../../../services/misc'
import { useTranslations } from '../../../hooks/useTranslations'
import { StarIcon } from '../../Layout/Icons'
import type { ReviewsPayload } from '../../../pages/api/reviews'
import data from '../../../data/pages/arguments.json'

const MAX_LENGTH = 240
const MAX_CARDS = 3

const shorten = (text: string) =>
	text.length > MAX_LENGTH ? `${text.slice(0, MAX_LENGTH).replace(/\s+\S*$/, '')}…` : text

const Stars: FC<{ rating: number; className?: string }> = ({ rating, className = 'w-4' }) => (
	<div className="flex items-center gap-1">
		{[0, 1, 2, 3, 4].map((i) => (
			<StarIcon key={i} type={rating > i ? (rating < i + 1 ? 'h' : 'f') : 'e'} className={className} />
		))}
	</div>
)

const GoogleReviewCards: FC = () => {
	const { locale } = useRouter()
	const t = useTranslations<string>()
	const [reviews, setReviews] = useState<ReviewsPayload | null>(null)

	useEffect(() => {
		fetch(`/api/reviews?locale=${locale}`)
			.then((res) => res.json())
			.then(setReviews)
			.catch(() => undefined)
	}, [locale])

	// nothing to show until Google answers - the section simply stays out of the way
	if (!reviews || typeof reviews.rating !== 'number' || !reviews.reviews.length) return null

	const link = reviews.mapsUri || `https://search.google.com/local/reviews?placeid=${reviews.placeId}`

	return (
		<div className="w-full space-y-8">
			<a
				href={link}
				target="_blank"
				rel="noopener noreferrer"
				className="flex items-center justify-center gap-4 max-w-max mx-auto px-6 py-3 rounded-2xl shadow-tile transition hover:shadow-tilearg"
			>
				<img src="/images/google-icon.svg" alt="Google" className="w-10 h-10" />
				<div className="text-left">
					<div className="flex items-center gap-2">
						<span className="text-2xl font-semibold leading-none">
							{(Math.floor(reviews.rating * 10) / 10).toFixed(1)}
						</span>
						<Stars rating={reviews.rating} />
					</div>
					<p className="text-sm text-warm-grey">
						{reviews.totalCount} {t(data.reviewsOnGoogle)}
					</p>
				</div>
			</a>

			<div className={c('grid grid-cols-3 gap-8', 'lg:grid-cols-2 lg:gap-6', 'md:grid-cols-1')}>
				{reviews.reviews.slice(0, MAX_CARDS).map((review) => (
					<div key={review.id} className="flex flex-col h-full p-6 space-y-4 bg-white rounded-xl shadow-tile">
						<Stars rating={review.rating} />
						<p className="flex-grow leading-relaxed">{`„${shorten(review.text)}“`}</p>
						<div className="flex items-center gap-3 pt-2 border-t border-dark-grey">
							{review.authorPhoto ? (
								<img src={review.authorPhoto} alt="" className="w-9 h-9 rounded-full" referrerPolicy="no-referrer" />
							) : (
								<span className="flex items-center justify-center w-9 h-9 rounded-full bg-light-blue text-dark-blue font-semibold">
									{review.authorName.charAt(0)}
								</span>
							)}
							<div className="text-sm">
								<p className="font-semibold">{review.authorName}</p>
								<p className="text-warm-grey">{review.relativeTime}</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default GoogleReviewCards
