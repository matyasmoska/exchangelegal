import React, { FC } from 'react'
import { TeamMember } from '../../../typings'
import Image from 'next/image'
import { c } from '../../../services/misc'
import ParagraphOrMultiple from '../../Layout/ParagraphOrMultiple'
import { Fade } from 'react-awesome-reveal'

const TeamMemberDetail: FC<{ member: TeamMember }> = ({ member }) => {
	return (
		<div
			className={c('flex max-w-3xl space-x-8 team-member', 'md:flex-col md:space-x-0 md:space-y-8 md:max-w-none')}
		>
			
				<div className="flex-shrink-0">
					<Image width={215} height={330} src={member.photo} />
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
