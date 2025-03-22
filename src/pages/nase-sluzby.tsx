import React, { FC, useEffect, useRef, useState } from 'react'
import DefaultLayout from '../layouts/DefaultLayout'
import SEO from '../components/Layout/SEO'
import pageData from '../data/pages/services.json'
import { ServiceItem, ServiceItemType } from '../components/Pages/services/ServiceItem'
import useServicesForm from '../components/Pages/services/hooks/useServicesForm'
import { c } from '../services/misc'
import OrderButton from '../components/Pages/services/OrderButton'
import ServicesForm from '../components/Pages/services/ServícesForm'
import { useVisible } from 'react-hooks-visible'
import { useTranslations } from '../hooks/useTranslations'
import { trackAddToCart } from '../components/Pages/services/serviceHelpers'

export default function Services () {
	const t = useTranslations()

	const [ selectedServices, setSelectedServices ] = useState<ServiceItemType[]>([])
	const [targetRef, visible] = useVisible()

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
				title="15 ZISIF – Naše služby | 15zisif.cz"
description="✅ Jsme odborníky v oblasti zakládání fondů ⭐ Máme unikátní zkušenosti a know-how v oblasti alternativních fondů dle § 15 ZISIF"
keywords="alternativní investiční fond, minifond, alternativní fond, § 15 ZISIF, 15zisif"
			/>
			<div className={c('py-16 space-y-12 text-center px-36', 'md:px-4 md:py-8 md:relative')}>
				<h1 className="text-5xl font-bold leading-snug">{t(pageData.ourServices)}</h1>
				<div className={c('grid grid-cols-3 gap-8 items-stretch', '2xl:grid-cols-3', 'md:grid-cols-1')}>
					{pageData.services.map((service: ServiceItemType) => (
						<ServiceItem
							key={service.id}
							serviceItem={service}
							selectedItems={selectedServices}
							setSelectedItems={setSelectedServices}
						/>
					))}
				</div>
				<OrderButton
					show={selectedServices.length !== 0 && !visible}
					text="Dokončit poptávku"
					disabled={selectedServices.length === 0}
				/>
			</div>
			<ServicesForm visibleRef={targetRef} form={servicesForm} />
		</DefaultLayout>
	)
}
