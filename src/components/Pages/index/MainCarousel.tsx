import { AnimatePresence, motion, motionValue } from 'framer-motion'
import React, { FC } from 'react'
import { useState, useEffect, useMemo } from 'react'
import { opacityAnimation } from '../../../animations/navigation'
import { c } from '../../../services/misc'
import { NewsItem } from '../../../typings'
import { ChevronLeft, ChevronRight } from '../../Layout/Icons'
import MainSection from './MainCarouselSections/MainSection'
import PEPSection from './MainCarouselSections/PEPSection'
import SecondarySection from './MainCarouselSections/SecondarySection'
import pageData from '../../../data/pages/index.json'
import { useBoolean, useInterval } from 'react-use'

const MainCarousel: FC<{ news: NewsItem[] }> = ({ news }) => {
	const components = [MainSection, SecondarySection, PEPSection]

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

	// Memoize current reference
	const CurrentSection = useMemo(() => components[currentItemIndex], [currentItemIndex])

	return (
		<div className="relative flex items-center w-full bg-dark-blue">
			<div className={c('absolute z-50 left-6', 'md:bottom-10')} onClick={moveLeft}>
				<ChevronLeft className="w-8 h-8 text-white transition cursor-pointer transform-gpu hover:scale-110" />
			</div>
			<div className="w-full">
				<AnimatePresence exitBeforeEnter>
					<motion.div key={CurrentSection.toString()} {...opacityAnimation}>
						{<CurrentSection news={news} />}
					</motion.div>
				</AnimatePresence>
			</div>
			<div className={c('absolute z-50 right-6', 'md:bottom-10')} onClick={moveRight}>
				<ChevronRight className="w-8 h-8 text-white transition cursor-pointer transform-gpu hover:scale-110" />
			</div>
		</div>
	)
}

export default MainCarousel
