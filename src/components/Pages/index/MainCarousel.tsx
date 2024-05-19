import { AnimatePresence, motion } from 'framer-motion'
import React, { FC, useEffect, useState } from 'react'
import { opacityAnimation } from '../../../animations/navigation'
import { c } from '../../../services/misc'
import { NewsItem } from '../../../typings'
import { ChevronLeft, ChevronRight } from '../../Layout/Icons'
import CarouselSection, { components } from './CarouselSection'
import pageData from '../../../data/pages/index.json'
import { useBoolean, useInterval } from 'react-use'
import NewsBar from './NewsBar'
import Reviews, { ReviewInfo } from './Reviews'

const MainCarousel: FC<{ news: NewsItem[] }> = ({ news }) => {
	const [currentItemIndex, setCurrentItemIndex] = useState(0)
	const [isMoving, setIsMoving] = useBoolean(true)

	const [reviews, setReviews] = useState<ReviewInfo>({})

	useEffect(() => {
		fetch("/api/reviews")
			.then(res => res.json())
			.then(res => res?.result?.data?.[0])
			.then(setReviews)
	}, [])

	const changeUp = () => setCurrentItemIndex(c => (c + 1) % components.length)

	useInterval(
		changeUp,
		isMoving ? pageData.carouselChangeEveryHowManySeconds * 1000 : null
	)

	const move = (direction: "left" | "right") => () => {
		setIsMoving(false)

		if (direction === "left") setCurrentItemIndex(c => (c > 0 ? c : components.length) - 1)
		else changeUp()
	}

	return (
		<div className="relative flex items-center w-full bg-dark-blue">
			<div className={c('absolute z-50 left-6', 'md:bottom-16')} onClick={move("left")}>
				<ChevronLeft className="w-8 h-8 text-white transition cursor-pointer transform-gpu hover:scale-110" />
			</div>
			<div className="w-full">
				<NewsBar news={news} />
				<AnimatePresence exitBeforeEnter>
					<motion.div key={components[currentItemIndex]} {...opacityAnimation}>
						<CarouselSection sectionKey={components[currentItemIndex]}>
							<Reviews {...reviews} />
						</CarouselSection>
					</motion.div>
				</AnimatePresence>
			</div>
			<div className={c('absolute z-50 right-6', 'md:bottom-16')} onClick={move("right")}>
				<ChevronRight className="w-8 h-8 text-white transition cursor-pointer transform-gpu hover:scale-110" />
			</div>
			<div className={c('absolute bottom-10 z-50 flex space-x-6 left-1/2 -translate-x-1/2')}>
				{components.map((key, index) => (
					<div
						key={key}
						onClick={() => setCurrentItemIndex(index)}
						className={c(
							'w-2.5 h-2.5 rounded-full',
							currentItemIndex === index ? 'bg-wine-primary' : 'bg-white cursor-pointer'
						)}
					/>
				))}
			</div>
		</div>
	)
}

export default MainCarousel
