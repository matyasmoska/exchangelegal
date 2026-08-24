import React, { FC, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import DefaultLayout from '../layouts/DefaultLayout'
import SEO from '../components/Layout/SEO'
import pageData from '../data/pages/services.json'
import { ServiceItem, ServiceItemType } from '../components/Pages/services/ServiceItem'
import useServicesForm from '../components/Pages/services/hooks/useServicesForm'
import { c } from '../services/misc'
import OrderButton from '../components/Pages/services/OrderButton'
import ServicesForm from '../components/Pages/services/ServicesForm'
import { useVisible } from 'react-hooks-visible'
import { useTranslations } from '../hooks/useTranslations'
import { trackAddToCart } from '../components/Pages/services/serviceHelpers'

export default function Services () {
	const t = useTranslations<string>()

	const router = useRouter()

	const [ selectedServices, setSelectedServices ] = useState<ServiceItemType[]>([])
	const [targetRef, visible] = useVisible()
	const formRef = useRef<HTMLDivElement>(null)

	// ?sluzba=<id> preselects a service and takes the visitor straight to the inquiry
	useEffect(() => {
		if (!router.isReady) return

		const requested = router.query.sluzba
		if (!requested) return

		const ids = (Array.isArray(requested) ? requested : [ requested ]).flatMap((value) => value.split(','))
		const services = pageData.services.filter(({ id }) => ids.includes(id)) as ServiceItemType[]
		if (!services.length) return

		setSelectedServices(services)
		window.setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150)
	}, [ router.isReady, router.query.sluzba ])

	const servicesForm = useServicesForm()
	

	useEffect(
		() => {
			servicesForm.setFieldValue('checked', selectedServices)
			if (selectedServices.length) {
				trackAddToCart(selectedServices)
			}
		},
		[ selectedServices ]
	)

	return (
		<DefaultLayout>
			<SEO
				title="Naše služby pro směnárny | pravoprosmenarny.cz"
description="✅ Jsme odborníky na směnárenskou činnost ⭐ Založení směnárny, povolení ČNB, AML compliance, reporting a příprava na kontrolu ČNB"
keywords="směnárna, založení směnárny, povolení k činnosti směnárníka, ČNB, AML, kontrolní směna, směnárenská činnost"
			/>
			<div className={c('py-16 space-y-12 text-center px-36', 'md:px-4 md:py-8 md:relative')}>
				<h1 className="text-5xl font-bold leading-snug">{t(pageData.ourServices)}</h1>
				<div className={c('grid grid-cols-3 gap-8 items-stretch', '2xl:grid-cols-3', 'md:grid-cols-1')}>
					{pageData.services.map((service: ServiceItemType, index: number) => (
						<ServiceItem
							key={service.id}
							index={index}
							serviceItem={service}
							selectedItems={selectedServices}
							setSelectedItems={setSelectedServices}
						/>
					))}
				</div>
				<OrderButton
					show={selectedServices.length !== 0 && !visible}
					text={t(pageData.finishInquiry)}
					disabled={selectedServices.length === 0}
				/>
			</div>
			<div ref={formRef}>
				<ServicesForm visibleRef={targetRef} form={servicesForm} />
			</div>
		</DefaultLayout>
	)
}
