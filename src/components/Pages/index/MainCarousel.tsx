import { AnimatePresence, motion, motionValue } from 'framer-motion'
import React, { FC } from 'react'
import { useState } from 'react'
import { opacityAnimation } from '../../../animations/navigation'
import { c } from '../../../services/misc'
import { NewsItem } from '../../../typings'
import { ChevronLeft, ChevronRight } from '../../Layout/Icons'
import CarouselSection, { components } from './CarouselSection'
import pageData from '../../../data/pages/index.json'
import { useBoolean, useInterval } from 'react-use'
import NewsBar from './NewsBar'
import Reviews from './Reviews'

const Dot: FC<{ isSelected: boolean; onClick: any }> = ({ isSelected, onClick }) => (
	<div
		onClick={onClick}
		className={c('w-2.5 h-2.5 rounded-full cursor-pointer', isSelected ? 'bg-wine-primary' : 'bg-white')}
	/>
)

const MainCarousel: FC<{ news: NewsItem[] }> = ({ news }) => {
	const [currentItemIndex, setCurrentItemIndex] = useState(0)
	const [isMoving, setIsMoving] = useBoolean(true)

	useInterval(
		() => {
			setCurrentItemIndex(c => {
				if (c < components.length - 1) return c + 1
				else return 0
			})
		},
		isMoving ? pageData.carouselChangeEveryHowManySeconds * 1000 : null
	)

	const moveRight = () => {
		setIsMoving(false)
		setCurrentItemIndex(c => {
			if (c < components.length - 1) return c + 1
			else return 0
		})
	}

	const moveLeft = () => {
		setIsMoving(false)
		setCurrentItemIndex(c => {
			if (c !== 0) return c - 1
			else return components.length - 1
		})
	}

	return (
		<div className="relative flex items-center w-full bg-dark-blue">
			<div className={c('absolute z-50 left-6', 'md:bottom-16')} onClick={moveLeft}>
				<ChevronLeft className="w-8 h-8 text-white transition cursor-pointer transform-gpu hover:scale-110" />
			</div>
			<div className="w-full">
				<NewsBar news={news} />
				<AnimatePresence exitBeforeEnter>
					<motion.div key={components[currentItemIndex]} {...opacityAnimation}>
						<CarouselSection sectionKey={components[currentItemIndex]}>
							<Reviews />
						</CarouselSection>
					</motion.div>
				</AnimatePresence>
			</div>
			<div className={c('absolute z-50 right-6', 'md:bottom-16')} onClick={moveRight}>
				<ChevronRight className="w-8 h-8 text-white transition cursor-pointer transform-gpu hover:scale-110" />
			</div>
			<div className={c('absolute bottom-10 z-50 flex space-x-6 left-1/2 -translate-x-1/2')}>
				{components.map((key, index) => (
					<Dot
						onClick={() => setCurrentItemIndex(index)}
						key={key}
						isSelected={currentItemIndex === index}
					/>
				))}
			</div>
		</div>
	)
}

export default MainCarousel
