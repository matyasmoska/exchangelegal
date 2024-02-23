import React, { FC } from 'react'
import { Fade } from 'react-awesome-reveal'
import { c } from '../../../services/misc'
import Image from 'next/image'

const PartnersSection: FC = () => {
	return (
		<div className={c('w-full space-y-12 mb-24 mt-24 px-36', '3xl:px-28', '2xl:px-20', 'md:px-8 md:py-16')}>
			<h2 className="text-4xl font-bold text-center">Partneři</h2>
			<div className={c('flex justify-between items-center gap-x-8', 'md:flex-col md:items-center md:space-y-16')}>
				<Fade damping={0.5} duration={500} cascade triggerOnce>
					
					<a href="https://www.amlsolutions.cz/" target="_blank" rel="noreferrer">
						<img alt="aml-solutions-logo" className="max-h-14" src={'/images/aml-solutions.png'} />
					</a>

					<a href="http://www.sphr.cz" target="_blank" rel="noreferrer">
						<img alt="sphere-logo" className="max-h-14" src={'/images/Primary_transparent_ořez.svg'} />
					</a>

					<a href="https://www.advokatniuschova.cz/" target="_blank" rel="noreferrer">
						<img alt="advokatni-uschova-logo" className="max-h-14" src={'/images/logo-advokatni-uschova.svg'} />
					</a>
					
					<a href="http://www.moskamurad.legal" target="_blank" rel="noreferrer">
						<img alt="moskamurad-logo" className="max-h-14" src={'/images/moska-murad.png'} />
					</a>
					
					<a href="https://www.pepcheck.cz/" target="_blank" rel="noreferrer">
						<img alt="pep-check-logo" className="max-h-14" src={'/images/pep-check.png'} />
					</a>


					
				</Fade>
			</div>
		</div>
	)
}

export default PartnersSection
