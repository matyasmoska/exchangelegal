import React from 'react'
import { c } from '../../../services/misc'
import Image from 'next/image'
import pageData from '../../../data/pages/index.json'
import Link from 'next/link'
import Button from '../../Layout/Button'

export const components = ["firstSection", "secondSection", "thirdSection"] as const

const CarouselSection = ({ sectionKey }: { sectionKey: typeof components[number] }) => {
	const { image, title, subtitle, primaryButton, secondaryButton } = pageData[sectionKey]

	return (
		<div
			className={c(
				'relative w-full bg-cover px-36 py-36 pt-28 h-[602px]',
				'3xl:px-28',
				'md:px-5 md:pt-28'
			)}
		>
			<Image
				layout="fill"
				objectFit="cover"
				priority
				src={image}
				alt="Background Image"
				className="absolute top-0 left-0 z-0"
			/>
			<div
				className={c(
					'absolute top-0 left-0 z-10 w-full h-full from-dark-blue via-[#021C62A6] bg-gradient-to-r to-transparent',
					'md:to-dark-blue md:opacity-80'
				)}
			/>

			<div className={c('relative z-10 max-w-3xl space-y-20 text-white', 'md:max-w-none md:text-center')}>
				<div className="flex flex-col space-y-8">
					<h1
						dangerouslySetInnerHTML={{ __html: title }}
						className={c('text-6xl font-bold leading-tight', 'md:text-4xl')}
					/>
					<p className="text-lg leading-relaxed text-justify">
						{subtitle}
					</p>
				</div>
				<div
					className={c(
						'grid gap-6 items-center w-9/12 grid-cols-2',
						'md:block md:space-y-6 md:w-full md:space-x-0'
					)}
				>
					<Link href={primaryButton.link}>
						<Button type="basic" className="px-3 py-2">
							{primaryButton.text}
						</Button>
					</Link>
					<Link href={secondaryButton.link}>
						<Button type="light" className="px-3 py-2">
							{secondaryButton.text}
						</Button>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default CarouselSection
