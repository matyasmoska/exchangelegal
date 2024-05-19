import React, { FC, useEffect, useMemo, useState } from 'react'
import { c } from '../../../services/misc'

type ReviewInfo = {
    rating?: number | string
    reviews_number?: number
    uri?: string
}

type Star = "h" | "f" | "e"

const getStars = (rating: ReviewInfo["rating"]): Star[] => {
    const stars: Star[] = []
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
            <div className="ti-widget ti-goog">
                {typeof rating === "number" && (
                    <div className="ti-widget-container">
                        <a href={`http://search.google.com/local/reviews?placeid=${uri}`} target="_blank" rel="noopener" className="ti-header source-Google">
                            <span className="ti-icon" />
                            <div className="ti-profile-details">
                                <div className="ti-text"> Google hodnocení</div>
                                <div className="ti-stars">
                                    <span className="ti-rating">{(Math.floor(rating * 10) / 10).toFixed(1)}</span>
                                    {stars.map((star, i) => (
                                        <span key={i} className={c("ti-star", star)} />
                                    ))}
                                </div>
                            </div>
                        </a>
                    </div>
                )}
            </div>
		</>
	)
}

export default Reviews
