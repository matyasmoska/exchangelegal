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
import ServicePicker from "../components/Pages/services/ServicePicker";
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

	// the audit is the entry point, the rest is up to the client
	const [selectedIds, setSelectedIds] = useState<string[]>(['pravni-audit-smenarny'])

	const applySelection = (ids: string[]) => {
		setSelectedIds(ids)
		const services = servicesData.services.filter(({ id }) => ids.includes(id))
		servicesForm.setFieldValue('checked', services)
		trackViewItems(services)
	}

	const toggleService = (id: string) =>
		applySelection(selectedIds.includes(id) ? selectedIds.filter((item) => item !== id) : [...selectedIds, id])

	useEffect(() => {
		applySelection(selectedIds)
	}, [])
	
    return (
        <DefaultLayout>
			<SEO
				title="Už provozuji směnárnu – AML audit a kontrola ČNB | pravoprosmenarny.cz"
description="✅ Jsme odborníky na směnárenskou činnost ⭐ Založení směnárny, povolení ČNB, AML compliance, reporting a příprava na kontrolu ČNB"
keywords="směnárna, založení směnárny, povolení k činnosti směnárníka, ČNB, AML, kontrolní směna, směnárenská činnost"
			/>
			<div className={c('relative items-center')}>
				<div className="relative w-full">
					<div className="h-[385px]">
						<Image
							layout="fill"
							objectFit="cover"
							className="absolute"
							priority
							src={'/images/hodnoceni-rizik.jpg'}
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
				<ServicePicker ids={offeredIds} selectedIds={selectedIds} onToggle={toggleService} />

		    <ServicesForm visibleRef={targetRef} form={servicesForm} />
		</DefaultLayout>
    );
}

export default ObligationsPage;
