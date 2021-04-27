import Link from 'next/link'
import React from 'react'
import { c } from '../../../services/misc'
import Button from '../../Layout/Button'
import pageData from '../../../data/pages/index.json'

const HeroSection = () => {
	return (
		<div className={c('relative z-10 max-w-2xl space-y-14 text-white', 'md:max-w-none md:text-center')}>
			<div className="flex flex-col space-y-8">
				<h1 className={c('text-6xl font-bold leading-snug', 'md:text-4xl')}>
					{pageData.title}
				</h1>
				<p className="leading-relaxed text-justify">
					{pageData.subtitle}
				</p>
			</div>
			<div className={c('grid gap-6 items-center w-9/12 grid-cols-2', 'md:block md:space-y-6 md:w-full md:space-x-0')}>
				<Link href="/obligations">
					<Button type="basic" className="px-12 py-2">
						{pageData.checkAMLObligations}
					</Button>
				</Link>
				<Link href="/whatisaml">
					<Button type="light" className="px-10 py-2">
						{pageData.whatIsAML}
					</Button>
				</Link>
			</div>
		</div>
	)
}

export default HeroSection
