import DefaultLayout from '../layouts/DefaultLayout'
import Image from 'next/image'
import React from 'react'
import { c } from '../services/misc'
import pageData from '../data/pages/whatisaml.json'
import ParagraphOrMultiple from '../components/Layout/ParagraphOrMultiple'

export default function WhatIsAMLPage () {
	return (
		<DefaultLayout>
			<div className={c('relative items-center')}>
				<div className="relative w-full">
					<div className="h-[485px]">
						<Image
							layout="fill"
							objectFit="cover"
							className="absolute"
							priority
							src={'/images/whatisaml_background.jpg'}
						/>
						<div
							className={c(
								'absolute top-0 left-0 z-10 w-full h-full from-dark-blue via-[#021C62A6] bg-gradient-to-r to-transparent',
								'md:to-dark-blue md:opacity-80'
							)}
						/>
						<div className="relative z-20 flex flex-col items-center justify-center w-full h-full text-center text-white">
							<div className="flex flex-col max-w-2xl space-y-6">
								<h1 className="text-[40px] font-bold">{pageData.header}</h1>
								<p className={c('text-xl font-medium', 'md:text-lg md:px-6')}>{pageData.shortText}</p>
							</div>
						</div>
					</div>
				</div>
				<div
					className={c(
						'flex flex-col items-center text-justify leading-relaxed',
						'2xl:py-16',
						'md:py-6 md:pb-16'
					)}
				>
					
					<section className={c('py-8 space-y-4', 'md:px-6 md:py-6')}>
						<ParagraphOrMultiple text={pageData.topText} className="text-dark-blue max-w-[802px]" />
					</section>
					<section className={c('flex justify-center w-full bg-light-blue py-14', 'md:py-8')}>
						<div
							className={c(
								'flex space-x-14 max-w-[802px]',
								'md:flex md:flex-col md:items-center md:px-6 md:space-x-0 md:space-y-8'
							)}
						>
							<div className="space-y-6 text-dark-blue">
								<h3 className="text-3xl font-bold">{pageData.highlightSection.header}</h3>
								<ParagraphOrMultiple text={pageData.highlightSection.text} className="text-justify" />
							</div>
							
						</div>
					</section>

					<section className={c('py-8 space-y-4', 'md:px-6 md:py-6')}>
						<ParagraphOrMultiple text={pageData.bottomText} className="text-dark-blue max-w-[802px]" />
					</section>

					
				</div>
			</div>
		</DefaultLayout>
	)
}
