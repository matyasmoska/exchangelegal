import DefaultLayout from '../layouts/DefaultLayout'
import { c } from '../services/misc'
import React from 'react'
import ParagraphOrMultiple from '../components/Layout/ParagraphOrMultiple'

export default function TOSPage () {
	return (
		<DefaultLayout>
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
