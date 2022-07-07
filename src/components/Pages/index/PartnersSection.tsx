import React, { FC } from 'react'
import { Fade } from 'react-awesome-reveal'
import { c } from '../../../services/misc'
import Image from 'next/image'

const PartnersSection: FC = () => {
	return (
		<div className={c('w-full space-y-12 mb-24 mt-24 px-36', 'md:px-8 md:py-16')}>
			<h2 className="text-4xl font-bold text-center">Partneři</h2>
			<div className={c('flex justify-center space-x-32', 'md:flex-col md:items-center md:space-x-0 md:space-y-16')}>
				<Fade damping={0.5} duration={500} cascade triggerOnce>
					
					<a href="https://www.amlsolutions.cz/" target="_blank" rel="noreferrer">
						<img alt="aml-solutions-logo" className="h-14" src={'/images/aml-solutions.png'} />
					</a>
					
					<a href="http://www.moskamurad.legal" target="_blank" rel="noreferrer">
						<img alt="moskamurad-logo" className="h-14" src={'/images/moska-murad.png'} />
					</a>
					
					<a href="https://www.pepcheck.cz/" target="_blank" rel="noreferrer">
						<img alt="pep-check-logo" className="h-14" src={'/images/pep-check.png'} />
					</a>
					<a href="https://www.safe-whistlers.cz" target="_blank" rel="noreferrer">
						<img alt="safe-whistlers-logo" className="h-14" src={'/images/safe-whistlers.png'} />
					</a>
					
				</Fade>
			</div>
		</div>
	)
}

export default PartnersSection
