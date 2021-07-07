import DefaultLayout from '../layouts/DefaultLayout'
import Image from 'next/image'
import React from 'react'
import { c } from '../services/misc'
import pageData from '../data/pages/whatisaml/whatisaml.json'
import ParagraphOrMultiple from '../components/Layout/ParagraphOrMultiple'
//@ts-ignore
import MDXText, {metadata} from '../data/pages/whatisaml/text.mdx'

export default function WhatIsAMLPage () {
	return (
		<DefaultLayout>
			<div className={c('relative items-center')}>
				<div className="relative w-full">
					<div className="h-[385px]">
						<Image
							layout="fill"
							objectFit="cover"
							className="absolute"
							priority
							src={'/images/co-je-to-aml.jpg'}
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
					<section className={c('py-8 space-y-4 prose max-w-[802px] leading-relaxed', 'md:px-6 md:py-6')}>
						<MDXText />
					</section>
				</div>
			</div>
		</DefaultLayout>
	)
}
