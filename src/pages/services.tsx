import React, { FC, useEffect, useState } from 'react'
import DefaultLayout from '../layouts/DefaultLayout'
import pageData from '../data/pages/services.json'
import Button from '../components/Layout/Button'
import { ArrowRight } from '../components/Layout/Icons'
import { ServiceItem, ServiceItemType } from '../components/Pages/services/ServiceItem'
import useServicesForm from '../components/Pages/services/hooks/useServicesForm'
import { c } from '../services/misc'

export default function Services () {
	const [ selectedServices, setSelectedServices ] = useState<ServiceItemType[]>([])

  const servicesForm = useServicesForm()

  useEffect(() => {
    servicesForm.setFieldValue('checked', selectedServices)
  }, [selectedServices]);

	return (
		<DefaultLayout>
			<div className="space-y-12 text-center p-36">
				<h1 className="text-5xl font-bold leading-snug">Naše služby</h1>
				<div className={c("grid grid-cols-4 gap-8", '2xl:grid-cols-3')}>
					{pageData.services.map((service: ServiceItemType) => {
						return (
							<ServiceItem
								serviceItem={service}
								selectedItems={selectedServices}
								setSelectedItems={setSelectedServices}
							/>
						)
					})}
				</div>
				<div className="flex justify-end">
					<Button type="basic" onClick={servicesForm.handleSubmit as any} className="px-12 py-3.5">
						<div className="flex items-center space-x-8">
							<span>Dokončit poptávku</span>
							<ArrowRight className="w-5 h-5" />
						</div>
					</Button>
				</div>
			</div>
		</DefaultLayout>
	)
}
