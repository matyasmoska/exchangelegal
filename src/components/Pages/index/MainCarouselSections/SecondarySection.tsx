import React from 'react'
import { c } from '../../../../services/misc'
import Image from 'next/image'
import thumbnail from '../../../../../public/images/secondary-background.jpg'
import pageData from '../../../../data/pages/index.json'
import Link from 'next/link'
import Button from '../../../Layout/Button'

const SecondarySection = () => {
	return (
		<div
			className={c(
				'relative w-full flex justify-center items-center bg-cover  h-[602px]',
				'md:px-5 md:py-28 md:pt-16 md:h-[674px]',
				'xs:px-1'
			)}
		>
			<Image
				layout="fill"
				objectFit="cover"
				priority
				placeholder="blur"
				src={thumbnail}
				alt="Background Image"
				className="absolute top-0 left-0 z-0"
			/>
			<div
				className={c(
					'absolute top-0 left-0 z-10 w-full h-full from-dark-blue via-[#021C62A6] bg-gradient-to-r to-transparent',
					'md:to-dark-blue md:opacity-80'
				)}
			/>
			
			<div className={c("z-10 flex items-center justify-center space-x-32 text-white", "2xl:px-20 2xl:space-x-20", "md:flex-col md:space-x-0 md:px-4 md:space-y-12")}>
				<div className={c("max-w-xl text-xl text-justify", "md:text-center")}>{pageData.secondarySection.leftText}</div>
				<div className={c('flex space-x-8 justify-center', 'md:block md:space-y-6 md:w-full md:space-x-0')}>
					<Link href="/overovani-mezinarodnich-sankci">
						<Button type="basic" className="px-6 py-3">
							{pageData.secondarySection.firstButtonText}
						</Button>
					</Link>
					<Link href="/seznam-rizikovych-zemi">
						<Button type="basic" className="px-10 py-3">
							{pageData.secondarySection.secondButtonText}
						</Button>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default SecondarySection
