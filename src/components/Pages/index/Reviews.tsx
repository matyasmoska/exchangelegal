import React, { FC, useEffect, useMemo, useState } from 'react'
import { StarIcon, StarType } from '../../Layout/Icons'

type ReviewInfo = {
    rating?: number | string
    reviews_number?: number
    uri?: string
}

const getStars = (rating: ReviewInfo["rating"]): StarType[] => {
    const stars: StarType[] = []
    if (typeof rating === "number") {
        for (let i = 0; i < 5; i++) {
            stars.push(rating > i ? rating < i + 1 ? "h" : "f" : "e")
        }
    }
    return stars
}

const Reviews: FC = () => {
    const [{ rating, reviews_number, uri }, setReviews] = useState<ReviewInfo>({})

	useEffect(() => {
		fetch("/api/reviews")
			.then(res => res.json())
			.then(res => res?.result?.data?.[0])
			.then(setReviews)
	}, [])

    const stars = useMemo(() => getStars(rating), [rating])

	return (
		<>
            {typeof rating === "number" && (
                <a
                    href={`http://search.google.com/local/reviews?placeid=${uri}`}
                    target="_blank"
                    rel="noopener"
                    className="flex items-center max-w-max px-6 py-1 text-dark-blue bg-white rounded-2xl"
                >
                    <img src="/images/google-icon.svg" className="w-12 h-12 mr-4" />
                    <div>
                        <p className="font-semibold">Google hodnocení</p>
                        <div className="flex items-start">
                            <p className="font-semibold text-[32px] leading-none mr-2">{(Math.floor(rating * 10) / 10).toFixed(1)}</p>
                            <div>
                                <div className="flex items-center gap-1 h-5">
                                    {stars.map((star, i) => (
                                        <StarIcon key={i} type={star} className="w-5" />
                                    ))}
                                </div>
                                <p className="text-sm">{reviews_number} hodnocení</p>
                            </div>
                        </div>
                    </div>
                </a>
            )}
		</>
	)
}

export default Reviews
