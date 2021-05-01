import DefaultLayout from '../layouts/DefaultLayout'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import Button from '../components/Layout/Button'
import Link from 'next/link'
import { c } from '../services/misc'
import pageData from '../data/pages/whatisaml.json'
import ParagraphOrMultiple from '../components/Layout/ParagraphOrMultiple'

export default function CalculatorPage () {
	return (
		<DefaultLayout>
			<div className={c('relative grid items-center grid-cols-2', 'md:flex md:flex-col-reverse')}>
				<div className="relative w-full h-full">
					<div className="relative">
						<Image
							width={950}
							height={980}
							layout="responsive"
							objectFit="cover"
							className="z-10"
							quality={85}
							src={'/images/whatisaml.png'}
						/>
						<div className="absolute top-0 left-0 w-full h-full transition transform bg-gray-400 animate-pulse" />
					</div>
				</div>
				<div className={c('px-12 space-y-5 text-justify', '2xl:py-16', 'md:py-6 md:pb-16 md:px-5')}>
					<h1 className="text-5xl font-bold">{pageData.header}</h1>
					<ParagraphOrMultiple text={pageData.text} className="prose max-w-none" />
					<div className="flex">
						<Link href="/obligations">
							<Button type="basic" className={c('px-16 py-2', 'md:w-full md:text-center md:py-3.5')}>
								Více informací
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</DefaultLayout>
	)
}
