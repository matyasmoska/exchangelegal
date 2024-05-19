import React, { FC } from 'react'
import { c } from '../../../services/misc'
import Image from 'next/image'
import pageData from '../../../data/pages/index.json'
import Link from 'next/link'
import Button from '../../Layout/Button'

export const components = ["firstSection", "secondSection", "thirdSection"] as const

const CarouselSection: FC<{ sectionKey: typeof components[number] }> = ({ sectionKey, children }) => {
	const { image, title, subtitle, primaryButton, secondaryButton, firstNumber, secondNumber } = pageData[sectionKey]

	return (
		<div
			className={c(
				'relative w-full bg-cover px-48 py-24 flex min-h-carousel',
				'xl:px-20',
				'md:px-8 md:min-h-0'
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

			<div className={c('relative z-10 font-header my-auto text-white', 'md:text-center')}>
				<div className="flex flex-col gap-8 md:gap-6">
					<div className="min-h-header-mobile md:order-3 md:mx-auto">
						{children}
					</div>
					<h1
						dangerouslySetInnerHTML={{ __html: title }}
						className={c('text-[54px] font-bold leading-normal max-w-4xl', 'md:text-[40px]')}
					/>
					<p className="max-w-xl min-h-header-mobile md:mx-auto md:text-center">
						{subtitle}
					</p>
				</div>
				<div
					className={c(
						'flex flex-wrap gap-x-8 gap-y-6 my-8',
						'md:flex-col md:my-6'
					)}
				>
					<Link href={secondaryButton.link}>
						<Button type="light" className="px-8 py-3">
							{secondaryButton.text}
						</Button>
					</Link>
					<Link href={primaryButton.link}>
						<Button type="basic" className="px-8 py-3">
							{primaryButton.text}
						</Button>
					</Link>
				</div>
				<div
					className={c(
						'flex flex-wrap gap-x-12 gap-y-6',
						'md:hidden'
					)}
				>
					<div>
						<h3 className="text-5xl leading-tight font-bold mb-3">{firstNumber.number}</h3>
						<p>{firstNumber.text}</p>
					</div>
					<div>
						<h3 className="text-5xl leading-tight font-bold mb-3">{secondNumber.number}</h3>
						<p>{secondNumber.text}</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CarouselSection
