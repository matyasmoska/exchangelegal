import React, { FC } from 'react'
import Image from 'next/image'
import NewsBar from '../NewsBar'
import { NewsItem } from '../../../../typings'
import HeroSection from '../HeroSection'
import thumbnail from '../../../../../public/images/background.jpg'
import { c } from '../../../../services/misc'

const MainSection: FC<{ news: NewsItem[] }> = ({ news }) => {
	return (
		<>
			<div className={c('relative w-full bg-cover px-36 py-36 pt-24 h-[602px]', '3xl:px-28', 'md:px-5 md:pt-36 md:h-[724px]')}>
				<Image
					layout="fill"
					objectFit="cover"
					priority
					placeholder="blur"
					src={thumbnail}
					alt="Background Image"
					className="top-0 left-0 z-0"
				/>
				<div
					className={c(
						'absolute top-0 left-0 z-10 w-full h-full from-dark-blue via-[#021C62A6] bg-gradient-to-r to-transparent',
						'md:to-dark-blue md:opacity-80'
					)}
				/>
				<HeroSection />
			</div>
		</>
	)
}

export default MainSection
