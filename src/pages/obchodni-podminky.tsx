import DefaultLayout from '../layouts/DefaultLayout'
import SEO from '../components/Layout/SEO'
import { c } from '../services/misc'
import React from 'react'
import ParagraphOrMultiple from '../components/Layout/ParagraphOrMultiple'

export default function TOSPage () {
	return (
		<DefaultLayout>
			<SEO
				title="AML solutions | Systémová řešení pro Vaše AML povinnosti na míru"
				description="Jsme předními odborníky v oblasti AML compliance"
				keywords="AML, AML solutions, AML compliance"
			/>
			<div className="flex justify-center w-full">
				<div
					className={c(
						'py-16 flex flex-col items-center text-center max-w-[803px] mb-52 space-y-14',
						'md:px-4 md:py-8'
					)}
				>
					<h1 className={c('text-5xl font-bold leading-snug', 'md:text-2xl')}>
						Obchodní podmínky
					</h1>
				</div>
			</div>
		</DefaultLayout>
	)
}
