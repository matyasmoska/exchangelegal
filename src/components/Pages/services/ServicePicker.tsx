import React, { FC } from 'react'
import { Fade } from 'react-awesome-reveal'
import { c } from '../../../services/misc'
import { useTranslations } from '../../../hooks/useTranslations'
import { LonelyCheckmarkIcon } from '../../Layout/Icons'
import servicesData from '../../../data/pages/services.json'
import data from '../../../data/pages/arguments.json'

type Service = typeof servicesData.services[number]

const ServicePicker: FC<{ ids: string[]; selectedIds: string[]; onToggle: (id: string) => void }> = ({
	ids,
	selectedIds,
	onToggle,
}) => {
	const t = useTranslations<string>()
	const services = ids
		.map((id) => servicesData.services.find((service) => service.id === id))
		.filter(Boolean) as Service[]

	return (
		<div className={c('font-header w-full space-y-8 py-16 px-36', '3xl:px-28', '2xl:px-20', 'md:px-6 md:py-10')}>
			<Fade direction={'up'} triggerOnce>
				<h2 className="text-4xl font-bold text-center">{t(data.servicePickerTitle)}</h2>
				<p className="text-center mt-4">{t(data.servicePickerText)}</p>
			</Fade>

			<div className={c('grid grid-cols-3 gap-8 max-w-6xl mx-auto', 'lg:grid-cols-2 lg:gap-6', 'md:grid-cols-1')}>
				{services.map((service) => {
					const selected = selectedIds.includes(service.id)

					return (
						<button
							key={service.id}
							type="button"
							onClick={() => onToggle(service.id)}
							aria-pressed={selected}
							className={c(
								'relative flex flex-col h-full p-6 space-y-3 text-left rounded-2xl border transition',
								'hover:shadow-tilearg',
								selected ? 'border-mint ring-2 ring-mint bg-light-blue' : 'border-dark-grey bg-white'
							)}
						>
							<span
								className={c(
									'absolute top-4 right-4 flex items-center justify-center w-6 h-6 rounded-full border transition',
									selected ? 'bg-ok-bg border-ok text-ok' : 'border-dark-grey text-transparent'
								)}
							>
								<LonelyCheckmarkIcon className="w-4 h-4" />
							</span>

							<img src={service.icon} alt="" className="w-10 h-10" />
							<h3 className="text-lg font-bold pr-8">{t(service.name)}</h3>
							<p className="flex-grow text-sm leading-relaxed text-warm-grey">{t(service.description)}</p>
							<p className="font-semibold">
								{service.price > 0
									? `${t(data.priceFrom)} ${service.price.toLocaleString('cs-CZ')} Kč`
									: t(data.priceFree)}
							</p>
						</button>
					)
				})}
			</div>
		</div>
	)
}

export default ServicePicker
