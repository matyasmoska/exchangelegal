import Link from 'next/link'
import React from 'react'
import { c } from '../../../services/misc'
import Button from '../../Layout/Button'
import pageData from '../../../data/pages/index.json'

const HeroSection = () => {
	return (
		<div className={c('relative z-10 max-w-2xl space-y-20 text-white', 'md:max-w-none md:text-center')}>
			<div className="flex flex-col space-y-8">
				<h1 className={c('text-6xl font-bold leading-tight', 'md:text-4xl')}>
					{pageData.title}
				</h1>
				<p className="text-lg leading-relaxed text-justify">
					{pageData.subtitle}
				</p>
			</div>
			<div className={c('grid gap-6 items-center w-9/12 grid-cols-2', 'md:block md:space-y-6 md:w-full md:space-x-0')}>
				<Link href="/obligations">
					<Button type="basic" className="px-6 py-2">
						{pageData.checkAMLObligations}
					</Button>
				</Link>
				<Link href="/services">
					<Button type="light" className="px-10 py-2">
						{pageData.seeAMLServices}
					</Button>
				</Link>
			</div>
		</div>
	)
}

export default HeroSection
