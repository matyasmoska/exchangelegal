import React, { FC } from 'react'
import { Fade } from 'react-awesome-reveal'
import { c } from '../../../services/misc'
import Image from 'next/image'
import { useTranslations } from '../../../hooks/useTranslations'
import pageData from '../../../data/pages/index.json'

const PartnersSection: FC = () => {
	const t = useTranslations()

	return (
		<div className={c('w-full space-y-12 mb-24 mt-24 px-36', '3xl:px-28', '2xl:px-20', 'md:px-8 md:py-16')}>
			<h2 className="text-4xl font-bold text-center">{t(pageData.partners)}</h2>
			<div className={c('flex justify-center items-center gap-x-40 2xl:gap-x-28 lg:gap-x-16', 'md:flex-col md:items-center md:space-y-16')}>
				<Fade damping={0.5} duration={500} cascade triggerOnce>

					<a href="https://www.pepcheck.cz/" target="_blank" rel="noreferrer">
						<img alt="pep-check-logo" className="max-h-14" src={'/images/pep-check.png'} />
					</a>

					<a href="https://www.cak.cz/" target="_blank" rel="noreferrer">
						<img alt="ceska-advokatni-komora-logo" className="max-h-14" src={'/images/cak-logo-15.jpg'} />
					</a>

					<a href="https://www.peers.law" target="_blank" rel="noreferrer">
						<img alt="PEERS advokátní kancelář" className="h-14 w-auto" src={'/images/peers-logo.svg'} />
					</a>

				</Fade>
			</div>
		</div>
	)
}

export default PartnersSection
