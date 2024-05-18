import React, { FC } from 'react'
import { Fade } from 'react-awesome-reveal'
import { c } from '../../../services/misc'

import data from '../../../data/pages/arguments.json'

const ArgumentsSection: FC = () => {
	return (
		<div className={c('w-full space-y-12 mt-16 px-36', '3xl:px-28', '2xl:px-20', 'md:px-8')}>
			<Fade direction={'up'} triggerOnce>
				<h2 className="text-4xl font-bold text-center">{data.title}</h2>
			</Fade>
			<div className={c('grid grid-cols-3 gap-x-16 gap-y-12', 'lg:grid-cols-2 lg:gap-12', 'md:grid-cols-1 md:gap-8')}>
				<Fade damping={0.5} duration={500} cascade triggerOnce>
					{data.arguments.map(({ icon, text, title }) => (
						<div
							key={title}
							className={c(
								'h-full min-h-argument p-5 space-y-4 text-center shadow-tilearg border borderGradient',
								'md:max-w-md md:mx-auto'
							)}
						>
							<img className="w-12 h-12 mx-auto" src={icon} />
							<h3 className="text-xl font-bold py-0.5">{title}</h3>
							<p className="max-w-xs mx-auto">{text}</p>
						</div>
					))}
				</Fade>
			</div>
		</div>
	)
}

export default ArgumentsSection
