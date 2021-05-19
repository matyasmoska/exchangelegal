import DefaultLayout from '../layouts/DefaultLayout'
import Image from 'next/image'
import pageData from '../data/pages/aboutus.json'
import { FC } from 'react'
import { TeamMember } from '../typings'
import React from 'react'
import TeamMemberDetail from '../components/Pages/about/TeamMemberDetail'
import { c } from '../services/misc'
import ParagraphOrMultiple from '../components/Layout/ParagraphOrMultiple'
import { useMediaQueries } from '../hooks/useMediaQueries'
import { Fade } from 'react-awesome-reveal'

interface Reference {
	photo: string
	reference: string
	who: string
}

const ReferenceDetail: FC<{ reference: Reference }> = ({ reference }) => {
	return (
		<div className={c('flex max-w-xl space-x-8 text-left', 'md:flex-col md:max-w-none md:space-x-0 md:space-y-12')}>
			<div className="flex-shrink-0">
				<Image width={177} height={263} src={reference.photo} />
			</div>
			<div className="space-y-4">
				<p className="text-3xl font-bold">{`“${reference.reference}”`}</p>
				<p className="text-sm"> {reference.who} </p>
			</div>
		</div>
	)
}

export default function AboutPage () {
	return (
		<DefaultLayout>
			<div className="text-center">
				<div className="relative w-full bg-gray-50">
					<Image
						layout="responsive"
						priority
						width={1920}
						height={485}
						className="z-10 w-full"
						src={'/images/team.png'}
					/>
				</div>
				<div className="flex flex-col items-center justify-center text-center my-14">
					<div className={c('flex flex-col max-w-6xl space-y-8', 'md:px-8 md:text-left')}>
						<h1 className="text-3xl font-bold">{pageData.header}</h1>
						<ParagraphOrMultiple text={pageData.headerDescription} className="text-justify" />
					</div>
					<div
						className={c(
							'flex flex-col items-center w-full my-24 space-y-20 text-left px-1/8 justify-self-start',
							'md:px-8'
						)}
					>
						{pageData.people.map((member: TeamMember) => (
							<Fade key={member.name} direction={'up'} triggerOnce duration={800}>
								<TeamMemberDetail member={member} />
							</Fade>
						))}
					</div>
					<div className={c('flex flex-col items-center space-y-20', 'md:px-8')}>
						<h1 className="text-3xl font-bold">Řekli o nás</h1>
						{pageData.references.map((reference: Reference) => (
							<Fade key={reference.who} direction={'up'} triggerOnce duration={800}>
								<ReferenceDetail reference={reference} />
							</Fade>
						))}
					</div>
				</div>
			</div>
		</DefaultLayout>
	)
}
