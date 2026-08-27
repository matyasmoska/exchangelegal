import React, { useEffect, useState } from "react";
import ParagraphOrMultiple from "../components/Layout/ParagraphOrMultiple";
import DefaultLayout from "../layouts/DefaultLayout";
import SEO from "../components/Layout/SEO";
import { c } from "../services/misc";
import Image from 'next/image'
import pageData from '../data/pages/zalozeni-smenarny-na-klic/zalozeni-smenarny-na-klic.json'

import servicesData from '../data/pages/services.json'
import useServicesForm from "../components/Pages/services/hooks/useServicesForm";
import { trackViewItems } from "../components/Pages/services/serviceHelpers";
import OrderButton from "../components/Pages/services/OrderButton";
import ServicesForm from "../components/Pages/services/ServicesForm";
import PackagePicker from "../components/Pages/services/PackagePicker";
import ChecklistForm from "../components/Layout/ChecklistForm";
import { useVisible } from "react-hooks-visible";

import Button from "../components/Layout/Button";
import Link from "next/link";
import { useTranslations } from "../hooks/useTranslations"
// @ts-ignore
import BottomPartCsMdx from "../data/pages/zalozeni-smenarny-na-klic/bottomPartCs.mdx"
// @ts-ignore
import BottomPartEnMdx from "../data/pages/zalozeni-smenarny-na-klic/bottomPartEn.mdx"

const bottomPart = {
	cs: <BottomPartCsMdx />,
	en: <BottomPartEnMdx />,
}

const ObligationsPage = () => {
	const t = useTranslations()
    
	const [targetRef, visible] = useVisible()

	const servicesForm = useServicesForm()

	const [selectedPackageId, setSelectedPackageId] = useState('zalozeni-smenarny-entry')

	const selectPackage = (serviceId: string) => {
		const service = servicesData.services.find(({ id }) => id === serviceId)
		if (!service) return
		setSelectedPackageId(serviceId)
		servicesForm.setFieldValue('checked', [service])
		trackViewItems([service])
	}

	useEffect(() => {
		selectPackage(selectedPackageId)
	}, [])
	
	return (
	   
        <DefaultLayout>
			<SEO
				title={{ cs: "Založení směnárny na klíč – povolení ČNB – pravoprosmenarny.cz", en: "Turnkey exchange office setup – CNB licence – pravoprosmenarny.cz" }}
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
							src={'/images/hero-smenarna.jpg'}
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
					<ChecklistForm />
					<div className={c('flex')}>

					</div>
				</div>
				<OrderButton show={!visible} text={pageData.buttonText} />
			</div>
				<PackagePicker selectedId={selectedPackageId} onSelect={selectPackage} />

		    <ServicesForm visibleRef={targetRef} form={servicesForm} />
		</DefaultLayout>
    );
}

export default ObligationsPage;
