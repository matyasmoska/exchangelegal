import React, { useEffect, useState } from "react";
import ParagraphOrMultiple from "../components/Layout/ParagraphOrMultiple";
import DefaultLayout from "../layouts/DefaultLayout";
import SEO from "../components/Layout/SEO";
import { c } from "../services/misc";
import Image from 'next/image'
import pageData from '../data/pages/uz-provozuji-smenarnu/uz-provozuji-smenarnu.json'

import servicesData from '../data/pages/services.json'
import useServicesForm from "../components/Pages/services/hooks/useServicesForm";
import { trackViewItems } from "../components/Pages/services/serviceHelpers";
import OrderButton from "../components/Pages/services/OrderButton";
import ServicesForm from "../components/Pages/services/ServicesForm";
import { ServiceItem, ServiceItemType } from "../components/Pages/services/ServiceItem";
import argumentsData from "../data/pages/arguments.json";
import { useVisible } from "react-hooks-visible";

import Button from "../components/Layout/Button";
import Link from "next/link";
import { useTranslations } from "../hooks/useTranslations"
// @ts-ignore
import BottomPartCsMdx from "../data/pages/uz-provozuji-smenarnu/bottomPartCs.mdx"
// @ts-ignore
import BottomPartEnMdx from "../data/pages/uz-provozuji-smenarnu/bottomPartEn.mdx"

const bottomPart = {
	cs: <BottomPartCsMdx />,
	en: <BottomPartEnMdx />,
}

const ObligationsPage = () => {
	const t = useTranslations()
	
			const [targetRef, visible] = useVisible()

	const servicesForm = useServicesForm()

	const offeredIds = [
		'pravni-audit-smenarny',
		'priprava-na-kontrolu-cnb',
		'aml-povinnosti',
		'pep-sankcni-screening',
		'reporting-cnb',
		'skoleni-aml',
		'whistleblowing-smernice',
	]

	const offeredServices = offeredIds
		.map((id) => servicesData.services.find((service) => service.id === id))
		.filter(Boolean) as ServiceItemType[]

	// the audit is the entry point, the rest is up to the client
	const [selectedServices, setSelectedServices] = useState<ServiceItemType[]>(
		offeredServices.filter(({ id }) => id === 'pravni-audit-smenarny')
	)

	useEffect(() => {
		servicesForm.setFieldValue('checked', selectedServices)
		trackViewItems(selectedServices)
	}, [selectedServices])
	
    return (
        <DefaultLayout>
			<SEO
				title={{ cs: "Už provozuji směnárnu – AML audit a kontrola ČNB | pravoprosmenarny.cz", en: "I already run an exchange office – AML audit and CNB inspections | pravoprosmenarny.cz" }}
description={{ cs: "✅ Jsme odborníky na směnárenskou činnost ⭐ Založení směnárny, povolení ČNB, AML compliance, reporting a příprava na kontrolu ČNB", en: "✅ We are experts on currency exchange regulation ⭐ Setting up an exchange office, CNB licence, AML compliance, reporting and inspection readiness" }}
keywords={{ cs: "směnárna, založení směnárny, povolení k činnosti směnárníka, ČNB, AML, kontrolní směna, směnárenská činnost", en: "exchange office, bureau de change, CNB licence, AML, test purchase, currency exchange" }}
			/>
			<div className={c('relative items-center')}>
				<div className="relative w-full">
					<div className="h-[385px]">
						<Image
							layout="fill"
							objectFit="cover"
							className="absolute"
							priority
							src={'/images/hero-provozovatel.jpg'}
						/>
						<div
							className={c(
								'absolute top-0 left-0 z-10 w-full h-full from-dark-blue via-[#11075699] bg-gradient-to-r to-transparent',
								'md:to-dark-blue md:opacity-80'
							)}
						/>
						<div className="relative z-20 flex flex-col items-center justify-center w-full h-full text-center text-white">
							<div className="flex flex-col max-w-2xl space-y-6">
								<h1 className="text-[40px] font-bold">{t(pageData.header)}</h1>
								<p className={c('text-xl font-medium', 'md:text-lg md:px-6')}>{t(pageData.shortText)}</p>
							</div>
						</div>
					</div>
				</div>
				<div
					className={c(
						'flex flex-col items-center text-justify leading-relaxed pb-16',
						'md:py-6 md:pb-16'
					)}
				>

					<section className={c('py-8 pb-12 space-y-4 max-w-[802px] leading-relaxed prose', 'md:px-6 md:py-6')}>
						{t(bottomPart)}
					</section>
					<div className={c('flex')}>

					</div>
				</div>
									<OrderButton show={!visible} text={pageData.buttonText} />
			</div>
				<div className={c('py-16 space-y-12 text-center px-36', 'md:px-4 md:py-8 md:relative')}>
					<h2 className="text-4xl font-bold leading-snug">{t(argumentsData.servicePickerTitle)}</h2>
					<p className="max-w-2xl mx-auto -mt-6">{t(argumentsData.servicePickerText)}</p>
					<div className={c('grid grid-cols-3 gap-8 items-stretch', '2xl:grid-cols-3', 'md:grid-cols-1')}>
						{offeredServices.map((service, index) => (
							<ServiceItem
								key={service.id}
								index={index}
								serviceItem={service}
								selectedItems={selectedServices}
								setSelectedItems={setSelectedServices}
							/>
						))}
					</div>
				</div>

		    <ServicesForm visibleRef={targetRef} form={servicesForm} />
		</DefaultLayout>
    );
}

export default ObligationsPage;
