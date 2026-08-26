import React, { FC } from 'react'
import Link from 'next/link'
import { Fade } from 'react-awesome-reveal'
import { c } from '../../../services/misc'
import { useTranslations } from '../../../hooks/useTranslations'
import { ArrowRight } from '../../Layout/Icons'

import data from '../../../data/pages/arguments.json'

const Tile: FC<{ href: string; title: string; text: string; cta: string; icon: string; highlight?: boolean }> = ({
	href,
	title,
	text,
	cta,
	icon,
	highlight,
}) => (
	<Link href={href}>
		<a
			className={c(
				'group flex flex-col h-full p-8 space-y-4 rounded-2xl border transition',
				'hover:shadow-tilearg hover:-translate-y-1',
				highlight ? 'bg-dark-blue text-white border-dark-blue' : 'bg-white border-dark-grey'
			)}
		>
			<img src={icon} alt="" className="w-12 h-12" />
			<h3 className="text-2xl font-bold">{title}</h3>
			<p className={c('flex-grow leading-relaxed', highlight ? 'text-white/80' : 'text-warm-grey')}>{text}</p>
			<span className={c('inline-flex items-center font-semibold', highlight ? 'text-mint' : 'text-mint-dark')}>
				{cta}
				<ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
			</span>
		</a>
	</Link>
)

const PathChooser: FC = () => {
	const t = useTranslations<string>()

	return (
		<div className={c('font-header w-full mt-20 px-36', '3xl:px-28', '2xl:px-20', 'md:px-8')}>
			<Fade direction={'up'} triggerOnce>
				<h2
					dangerouslySetInnerHTML={{ __html: t(data.pathChooserTitle) }}
					className="text-3xl font-bold text-center mb-10"
				/>
			</Fade>
			<div className={c('grid grid-cols-2 gap-10 max-w-5xl mx-auto', 'md:grid-cols-1 md:gap-6')}>
				<Fade damping={0.4} duration={500} cascade triggerOnce>
					<Tile
						href="/#je-to-pro-vas"
						icon="/images/argumentIcons/licence-cnb.svg"
						title={t(data.pathFoundTitle)}
						text={t(data.pathFoundText)}
						cta={t(data.pathFoundCta)}
					/>
					<Tile
						href="/uz-provozuji-smenarnu"
						icon="/images/argumentIcons/compliance.svg"
						title={t(data.pathRunTitle)}
						text={t(data.pathRunText)}
						cta={t(data.pathRunCta)}
						highlight
					/>
				</Fade>
			</div>
		</div>
	)
}

export default PathChooser
