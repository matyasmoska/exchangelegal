import React, { FC } from 'react'
import { Fade } from 'react-awesome-reveal'
import { c } from '../../../services/misc'
import Image from 'next/image'

const PartnersSection: FC = () => {
	return (
		<div className={c('w-full space-y-12 mb-24 mt-24 px-36', '3xl:px-28', '2xl:px-20', 'md:px-8 md:py-16')}>
			<h2 className="text-4xl font-bold text-center">Členství & Partneři</h2>
			<div className={c('flex justify-between items-center gap-x-8', 'md:flex-col md:items-center md:space-y-16')}>
				<Fade damping={0.5} duration={500} cascade triggerOnce>
					


					<a href="https://lei-ceska.cz/?affiliate_code=15zisif" target="_blank" rel="noreferrer">
						<img alt="lei-ceska-logo" className="max-h-14" src={'/images/lei-ceska-fin.png'} />
					</a>
					
					<a href="https://www.pepcheck.cz/" target="_blank" rel="noreferrer">
						<img alt="pep-check-logo" className="max-h-14" src={'/images/pep-check.png'} />
					</a>

					<a href="https://www.cak.cz/" target="_blank" rel="noreferrer">
						<img alt="ceska-advokatni-komora-logo" className="max-h-15" src={'/images/517-cak-logo.svg'} />
					</a>

					<a href="http://www.sphr.cz" target="_blank" rel="noreferrer">
						<img alt="sphere-logo" className="max-h-14" src={'/images/Primary_transparent_ořez.svg'} />
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
