import DefaultLayout from '../layouts/DefaultLayout'
import SEO from '../components/Layout/SEO'
import Image from 'next/image'
import pageData from '../data/pages/aboutus.json'
import { FC } from 'react'
import { TeamMember } from '../typings'
import React from 'react'
import TeamMemberDetail from '../components/Pages/about/TeamMemberDetail'
import { c } from '../services/misc'
import ParagraphOrMultiple from '../components/Layout/ParagraphOrMultiple'
import { Fade } from 'react-awesome-reveal'
import ReferencesCarousel from '../components/Pages/about/ReferencesCarousel'

export interface Reference {
	photo: string
	reference: string
	who: string
}

export default function AboutPage () {
	return (
		<DefaultLayout>
			<SEO
				title="O nás – AML solutions"
				description="✅ Jsme předními odborníky v oblasti AML compliance ⭐ Máme unikátní zkušenosti a know-how v AML/CFT"
				keywords="AML, AML solutions, AML compliance, AML povinnosti, AML systém vnitřních zásad, AML školení, AML hodnocení rizik, AML dotazník, AML zákon, AML směrnice"
			/>
			<div className="text-center">
				<div className="relative w-full bg-gray-50">
					<Image
						layout="responsive"
						priority
						width={1920}
						height={485}
						className="z-10 w-full"
						src={'/images/team.jpg'}
					/>
				</div>
				<div className="flex flex-col items-center justify-center text-center my-14">
					<div className={c('flex flex-col max-w-6xl space-y-8', 'md:px-8 md:text-left')}>
						<h2 className="text-3xl font-bold">{pageData.header}</h2>
						<ParagraphOrMultiple text={pageData.headerDescription} className="text-justify max-w-[900px]" />
					</div>
					<div
						className={c(
							'flex flex-col items-center w-full my-24 space-y-40 text-left justify-self-start',
							'md:px-8'
						)}
					>
						{pageData.people.map((member: TeamMember) => (
							<Fade key={member.name} direction={'up'} triggerOnce duration={800}>
								<TeamMemberDetail member={member} />
							</Fade>
						))}
					</div>
					<div className={c('flex flex-col my-24 items-center space-y-20', 'md:px-8')}>
						<ReferencesCarousel references={pageData.references} />
					</div>
				</div>
			</div>
		</DefaultLayout>
	)
}
