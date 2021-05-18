import React, { FC } from 'react'
import { TeamMember } from '../../../typings'
import Image from 'next/image'
import { c } from '../../../services/misc'
import ParagraphOrMultiple from '../../Layout/ParagraphOrMultiple'
import { Fade } from 'react-awesome-reveal'
import { useMediaQueries } from '../../../hooks/useMediaQueries'

const TeamMemberDetail: FC<{ member: TeamMember }> = ({ member }) => {
	const { isMd } = useMediaQueries()

	return (
		<div
			style={{ gridTemplateColumns: isMd ? '1fr' : '0.75fr 1fr' }}
			className={c(
				'grid max-w-6xl space-x-8 team-member items-start',
				'md:space-x-0 md:space-y-8 md:max-w-none'
			)}
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
				<div className={c("absolute w-full h-full bg-orange-primary -bottom-5 -left-5", 'md:-bottom-2.5 md:-left-2.5')} />
			</div>
			<div className="space-y-6">
				<div className="space-y-1.5">
					<h3 className="text-3xl font-bold">{member.name}</h3>
					<p className="text-sm">{member.title}</p>
				</div>
				<div className="space-y-6">
					<ParagraphOrMultiple className="text-justify" text={member.description} />
				</div>
			</div>
		</div>
	)
}

export default TeamMemberDetail
