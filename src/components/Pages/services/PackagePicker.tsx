import React, { FC } from 'react'
import { Fade } from 'react-awesome-reveal'
import { c } from '../../../services/misc'
import { useTranslations } from '../../../hooks/useTranslations'
import PricingCard from './PricingCard'

import data from '../../../data/pages/arguments.json'

const PackagePicker: FC<{ selectedId?: string; onSelect: (serviceId: string) => void }> = ({ selectedId, onSelect }) => {
	const t = useTranslations<string>()

	return (
		<div className={c('font-header w-full space-y-8 py-16 px-36', '3xl:px-28', '2xl:px-20', 'md:px-6 md:py-10')}>
			<Fade direction={'up'} triggerOnce>
				<h2 className="text-4xl font-bold text-center">{t(data.packagePickerTitle)}</h2>
				<p className="text-center mt-4">{t(data.packagePickerText)}</p>
			</Fade>
			<div className={c('grid grid-cols-3 gap-12', 'lg:grid-cols-1 lg:gap-8')}>
				{data.pricingVariants.map((variant) => (
					<PricingCard
						key={variant.serviceId}
						variant={variant}
						buttonType={variant.recommended ? 'light' : 'secondary'}
						selected={selectedId === variant.serviceId}
						onSelect={() => onSelect(variant.serviceId)}
					/>
				))}
			</div>
		</div>
	)
}

export default PackagePicker
