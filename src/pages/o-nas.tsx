import DefaultLayout from '../layouts/DefaultLayout'
import SEO from '../components/Layout/SEO'
import Image from 'next/image'
import pageData from '../data/pages/aboutus.json'
import { FC } from 'react'
import React from 'react'
import TeamMemberDetail from '../components/Pages/about/TeamMemberDetail'
import { c } from '../services/misc'
import ParagraphOrMultiple from "../components/Layout/ParagraphOrMultiple";
import { Fade } from 'react-awesome-reveal'
import GoogleReviews from "../components/Pages/about/GoogleReviews";
import { useTranslations } from '../hooks/useTranslations'

export default function AboutPage () {
	const t = useTranslations<string>()

	return (
		<DefaultLayout>
			<SEO
				title="O nás – pravoprosmenarny.cz"
description="✅ Jsme odborníky na směnárenskou činnost ⭐ Založení směnárny, povolení ČNB, AML compliance, reporting a příprava na kontrolu ČNB"
keywords="směnárna, založení směnárny, povolení k činnosti směnárníka, ČNB, AML, kontrolní směna, směnárenská činnost"
			/>
			<div className="text-center">
				<div className="relative w-full bg-gray-50">
					<Image
						layout="fill"
						priority

						className="z-10 w-full"
						src={'/images/background-moska-partl.jpg'}
					/>
				</div>
				<div className="flex flex-col items-center justify-center text-center my-14">
					<div className={c('flex flex-col max-w-6xl space-y-8', 'md:px-8 md:text-left')}>
						<h2 className="text-3xl font-bold">{t(pageData.header)}</h2>
						<ParagraphOrMultiple text={pageData.headerDescription} className="text-justify max-w-[900px]" />
					</div>
					<div
						className={c(
							'flex flex-col items-center w-full my-24 space-y-40 text-left justify-self-start',
							'md:px-8'
						)}
					>
						{pageData.people.map((member) => (
							<Fade key={t(member.name)} direction={'up'} triggerOnce duration={800}>
								<TeamMemberDetail member={member} />
							</Fade>
						))}
					</div>
					<div className={c('flex flex-col my-24 items-center space-y-20', 'md:px-8')}>
						<GoogleReviews />
					</div>
				</div>
			</div>
		</DefaultLayout>
	)
}
