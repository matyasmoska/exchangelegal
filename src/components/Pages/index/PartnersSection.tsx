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
			<div className={c('flex justify-between items-center gap-x-8', 'md:flex-col md:items-center md:space-y-16')}>
				<Fade damping={0.5} duration={500} cascade triggerOnce>

					<a href="https://lei-ceska.cz/?affiliate_code=15zisif" target="_blank" rel="noreferrer">
						<img alt="lei-ceska-logo" className="max-h-14" src={'/images/lei-ceska-fin.png'} />
					</a>

					<a href="https://www.pepcheck.cz/" target="_blank" rel="noreferrer">
						<img alt="pep-check-logo" className="max-h-14" src={'/images/pep-check.png'} />
					</a>

					<a href="https://www.cak.cz/" target="_blank" rel="noreferrer">
						<img alt="ceska-advokatni-komora-logo" className="max-h-14" src={'/images/cak-logo-15.jpg'} />
					</a>

					<a href="http://www.moskamurad.legal" target="_blank" rel="noreferrer">
						<img alt="moskamurad-logo" className="max-h-14" src={'/images/moska-murad.png'} />
					</a>

					<a href="https://www.advokatniuschova.cz/" target="_blank" rel="noreferrer">
						<img alt="advokatni-uschova-logo" className="max-h-14" src={'/images/logo-advokatni-uschova.svg'} />
					</a>

				</Fade>
			</div>
		</div>
	)
}

export default PartnersSection
