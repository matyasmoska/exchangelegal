import React, { FC } from 'react'
import { Fade } from 'react-awesome-reveal'
import { c } from '../../../services/misc'
import { useTranslations } from '../../../hooks/useTranslations'
import pageData from '../../../data/pages/aboutus.json'

const TeamGrid: FC = () => {
	const t = useTranslations<string>()

	return (
		<div className="w-full space-y-10">
			<Fade direction={'up'} triggerOnce>
				<div className="space-y-4 text-center">
					<h2 className="text-4xl font-bold">{t(pageData.teamTitle)}</h2>
					<p className="max-w-2xl mx-auto">{t(pageData.teamDescription)}</p>
				</div>
			</Fade>

			<div className={c('grid grid-cols-4 gap-8', 'xl:grid-cols-3', 'lg:grid-cols-2 lg:gap-6', 'sm:grid-cols-1')}>
				<Fade damping={0.15} duration={500} cascade triggerOnce>
					{pageData.team.map((member) => (
						<div
							key={member.name}
							className={c(
								'flex flex-col h-full overflow-hidden bg-white border rounded-2xl border-dark-grey transition',
								'hover:shadow-tilearg'
							)}
						>
							<div className="bg-light-blue">
								<img
									src={member.photo}
									alt={member.name}
									loading="lazy"
									className="object-cover object-top w-full h-64 lg:h-72"
								/>
							</div>

							<div className="flex flex-col flex-grow p-5 space-y-3">
								<div>
									<h3 className="text-lg font-bold leading-tight">{member.name}</h3>
									<p className="text-sm text-mint-dark font-semibold">{t(member.position)}</p>
								</div>

								<p className="text-xs text-warm-grey">{t(member.languages)}</p>

								<div className="flex flex-wrap gap-2 mt-auto pt-1">
									{member.tags.map((tag) => (
										<span key={t(tag)} className="px-2 py-1 text-xs rounded-full bg-light-blue text-dark-blue">
											{t(tag)}
										</span>
									))}
								</div>
							</div>
						</div>
					))}
				</Fade>
			</div>

			<p className="text-sm text-center text-warm-grey">{t(pageData.teamNote)}</p>
		</div>
	)
}

export default TeamGrid
