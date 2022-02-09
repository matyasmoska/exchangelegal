import React from 'react'
import { c } from '../../../../services/misc'
import Button from '../../../Layout/Button'
import pageData from '../../../../data/pages/index.json'
import { useMediaQueries } from '../../../../hooks/useMediaQueries'

const PEPSection = () => {
	const { isMd } = useMediaQueries()

	return (
		<div
			className={c(
				'relative w-full bg-cover px-36 py-36 pt-24 h-[602px] bg-white',
				'3xl:px-28 3xl:pr-32',
				'md:px-5 md:pt-36 md:h-[704px]'
			)}
		>
			<img
				src={'/images/pep-background.svg'}
				alt="Background Image"
				className={c('absolute max-w-xl pt-24 top-10 right-52', '3xl:right-24', '2xl:right-6 2xl:max-w-lg 2xl:pt-28')}
			/>
			<div
				className={c(
					'absolute top-0 left-0 z-10 w-full h-full',
					'md:bg-dark-blue md:opacity-100'

			/>
			<div
				className={c(
					'relative z-10 max-w-3xl space-y-12 text-white',
					'2xl:max-w-xl',
					'md:max-w-none md:text-center md:flex md:flex-col md:items-center'
				)}
			>
				<div className="flex flex-col space-y-8">
					<h1
						dangerouslySetInnerHTML={{ __html: pageData.pepCheckSection.title }}
						className={c('text-5xl font-bold leading-tight', 'md:text-3xl')}
					/>
					<p className="text-lg leading-relaxed text-justify">{pageData.pepCheckSection.subtitle}</p>
				</div>
				<div
					className={c(
						'grid gap-6 items-center w-9/12 grid-cols-2',
						'2xl:w-full',
						'md:block md:space-y-6 md:w-full md:space-x-0'
					)}
				>
					<a href="https://pepcheck.cz" target="_blank" rel="noreferrer">
						<Button type="basic" className="px-6 py-2">
							{pageData.pepCheckSection.buttonText}
						</Button>
					</a>
				</div>
			</div>
		</div>
	)
}

export default PEPSection
