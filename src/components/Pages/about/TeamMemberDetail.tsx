import React, { FC } from 'react'
import { TeamMember } from '../../../typings'
import Image from 'next/image'
import { c } from '../../../services/misc'
import ParagraphOrMultiple from '../../Layout/ParagraphOrMultiple'
import { Fade } from 'react-awesome-reveal'
import { useMediaQueries } from '../../../hooks/useMediaQueries'
import { LinkedInIcon } from '../../Layout/Icons'

const TeamMemberDetail: FC<{ member: TeamMember }> = ({ member }) => {
	const { isMd } = useMediaQueries()

	return (
		<div
			style={{ gridTemplateColumns: isMd ? '1fr' : '0.6fr 1fr' }}
			className={c('grid max-w-6xl space-x-8 team-member items-start', 'md:space-x-0 md:space-y-8 md:max-w-none')}
		>
			<div className="relative flex-shrink-0">
				<div>
					<Image
						layout="responsive"
						className="z-10"
						objectFit="fill"
						width={524}
						height={628}
						src={member.photo}
					/>
				</div>
				{member.linkedIn && (
					<a
						href={member.linkedIn}
						className={c(
							'absolute z-30 flex items-center px-5 py-2 space-x-2 rounded-full bottom-4 right-4 text-dark-blue bg-light-blue',
							'hover:scale-102 transform transition'
						)}
						target="_blank"
					>
						<LinkedInIcon className="fill-current w-7 h-7" />
						<span>LinkedIn Profil</span>
					</a>
				)}
				<div
					className={c(
						'absolute w-full h-full bg-orange-primary -bottom-5 -left-5',
						'md:-bottom-2.5 md:-left-2.5'
					)}
				/>
			</div>
			<div className="space-y-6">
				<div className="space-y-4">
					<h3 className="text-3xl font-bold">{member.name}</h3>
					<div className="flex items-center space-x-2">
						{ member.tags.map(tag => (
							<div className="px-4 py-1 text-sm rounded-full bg-light-blue text-dark-blue">
								{ tag }
							</div>
						))}
					</div>
				</div>
				<div className="space-y-6">
					<ParagraphOrMultiple className="text-justify" text={member.description} />
				</div>
			</div>
		</div>
	)
}

export default TeamMemberDetail
