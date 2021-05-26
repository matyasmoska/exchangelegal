import React, { FC, useEffect, useRef, useState } from 'react'
import DefaultLayout from '../layouts/DefaultLayout'
import pageData from '../data/pages/services.json'
import Button from '../components/Layout/Button'
import { ArrowRight } from '../components/Layout/Icons'
import { ServiceItem, ServiceItemType } from '../components/Pages/services/ServiceItem'
import useServicesForm from '../components/Pages/services/hooks/useServicesForm'
import { c, doScrolling } from '../services/misc'
import ServicesForm from '../components/Pages/services/ServícesForm'
import { AnimatePresence, motion } from 'framer-motion'
import { opacityAnimation } from '../animations/navigation'
import { useVisible } from 'react-hooks-visible'

export default function Services () {
	const [ selectedServices, setSelectedServices ] = useState<ServiceItemType[]>([])
	const [targetRef, visible] = useVisible()

	const servicesForm = useServicesForm()
	

	useEffect(
		() => {
			servicesForm.setFieldValue('checked', selectedServices)
		},
		[ selectedServices ]
	)

	return (
		<DefaultLayout>
			<div className={c('py-16 space-y-12 text-center px-36', 'md:px-4 md:py-8 md:relative')}>
				<h1 className="text-5xl font-bold leading-snug">Naše služby</h1>
				<div className={c('grid grid-cols-3 gap-8 items-stretch', '2xl:grid-cols-3', 'md:grid-cols-1')}>
					{pageData.services.map((service: ServiceItemType) => (
						<ServiceItem
							key={service.name}
							serviceItem={service}
							selectedItems={selectedServices}
							setSelectedItems={setSelectedServices}
						/>
					))}
				</div>
				<AnimatePresence>
					{selectedServices.length !== 0 && !visible && <motion.div
						{ ...opacityAnimation }
						className={c(
							'fixed bottom-8 right-8 flex justify-end',
							'md:justify-center'
					)}
					>
						<Button
							type="basic"
							disabled={selectedServices.length === 0}
							onClick={() => doScrolling('#services-form', 1000, 100)}
							className={c('px-12 py-3.5', 'md:py-3 md:px-10')}
						>
							<div className="flex items-center space-x-8">
								<span>Dokončit poptávku</span>
								<ArrowRight className="w-5 h-5" />
							</div>
						</Button>
					</motion.div>}
				</AnimatePresence>
			</div>
			<ServicesForm visibleRef={targetRef} form={servicesForm} />
		</DefaultLayout>
	)
}
