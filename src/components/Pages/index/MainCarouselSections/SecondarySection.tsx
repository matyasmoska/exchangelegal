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
				'relative w-full bg-cover px-36 py-36 pt-24 h-[602px]',
				'3xl:px-28',
				'md:px-5 md:pt-28 md:h-[724px]'
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

			<div className={c('relative z-10 max-w-3xl space-y-20 text-white', 'md:max-w-none md:text-center')}>
				<div className="flex flex-col space-y-8">
					<h1
						dangerouslySetInnerHTML={{ __html: pageData.secondarySection.title }}
						className={c('text-6xl font-bold leading-tight', 'md:text-4xl')}
					/>
					<p className="text-lg leading-relaxed text-justify">{pageData.secondarySection.subtitle}</p>
				</div>
				<div
					className={c(
						'grid gap-6 items-center w-9/12 grid-cols-2',
						'md:block md:space-y-6 md:w-full md:space-x-0'
					)}
				>
					<a href="https://www.amlsolutions.cz/overovani-mezinarodnich-sankci" target="_blank" rel="noreferrer">
						<Button type="basic" className="px-3 py-2">
							{pageData.secondarySection.firstButtonText}
						</Button>
					</a>
					<Link href="/seznam-vysoce-rizikovych-zemi">
						<Button type="light" className="px-10 py-2">
							{pageData.secondarySection.secondButtonText}
						</Button>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default SecondarySection
