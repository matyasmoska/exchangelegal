import React, { FC } from 'react'
import { Fade } from 'react-awesome-reveal'
import { c } from '../../../services/misc'
import Image from 'next/image'

const PartnersSection: FC = () => {
	return (
		<div className={c('w-full space-y-12 mb-44 mt-36 px-36', 'md:px-8 md:py-16')}>
			<h2 className="text-4xl font-bold text-center">Hlavní Partneři</h2>
			<div className={c('flex justify-center space-x-32', 'md:flex-col md:items-center md:space-x-0 md:space-y-16')}>
				<Fade damping={0.5} duration={500} cascade triggerOnce>
					<a href="http://www.ondato.com/" target="_blank" rel="noreferrer">
						<Image height={54} width={204} alt="ondato-logo" className="h-14" src={'/images/ondato.png'} />
					</a>
					<a href="https://www.pozemkovekompenzace.cz/" target="_blank" rel="noreferrer">
						<Image height={54} width={429} alt="pkf-logo" className="h-14" src={'/images/PKF logo.png'} />
					</a>
					<img alt="bill-logo" className="h-14" src={'/images/Bill_logo_horizontal.svg'} />
				</Fade>
			</div>
		</div>
	)
}

export default PartnersSection
