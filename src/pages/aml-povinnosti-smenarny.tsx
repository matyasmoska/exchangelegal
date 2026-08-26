import React, { useEffect } from "react";
import ParagraphOrMultiple from "../components/Layout/ParagraphOrMultiple";
import DefaultLayout from "../layouts/DefaultLayout";
import SEO from "../components/Layout/SEO";
import { c } from "../services/misc";
import Image from 'next/image'
import pageData from '../data/pages/obligations/obligations.json'

import servicesData from '../data/pages/services.json'
import useServicesForm from "../components/Pages/services/hooks/useServicesForm";
import { trackViewItems } from "../components/Pages/services/serviceHelpers";
import OrderButton from "../components/Pages/services/OrderButton";
import ServicesForm from "../components/Pages/services/ServicesForm";
import { useVisible } from "react-hooks-visible";

import Button from "../components/Layout/Button";
import Link from "next/link";
import { useTranslations } from "../hooks/useTranslations"
// @ts-ignore
import TopPartCsMdx from "../data/pages/obligations/topPartCs.mdx"
// @ts-ignore
import TopPartEnMdx from "../data/pages/obligations/topPartEn.mdx"
// @ts-ignore
import BottomPartCsMdx from "../data/pages/obligations/bottomPartCs.mdx"
// @ts-ignore
import BottomPartEnMdx from "../data/pages/obligations/bottomPartEn.mdx"

const topPart = {
	cs: <TopPartCsMdx />,
	en: <TopPartEnMdx />,
}

const bottomPart = {
	cs: <BottomPartCsMdx />,
	en: <BottomPartEnMdx />,
}

const ObligationsPage = () => {
	const t = useTranslations()

	// the band is part of the shared template; render it only when it has content
	const highlightValue = (value: any): string =>
		typeof value === 'string' ? value : String(t(value) ?? '')
	const hasHighlight = Boolean(
		highlightValue(pageData.highlightSection.header).trim() ||
			pageData.highlightSection.text.some((item: any) => highlightValue(item).trim())
	)
	
				const [targetRef, visible] = useVisible()

	const servicesForm = useServicesForm()

	useEffect(() => {
		const selectedServices = servicesData.services.filter(({ id }) => id === 'aml-povinnosti')
		servicesForm.setFieldValue('checked', selectedServices)
		trackViewItems(selectedServices)
	}, [])
	
    return (
        <DefaultLayout>
			<SEO
				title={{ cs: "AML povinnosti směnárny – SVZ, identifikace, screening – pravoprosmenarny.cz", en: "AML obligations of an exchange office – policy, identification, screening – pravoprosmenarny.cz" }}
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
							src={'/images/obligations_background.jpg'}
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
					<section className={c('py-8 space-y-4 prose max-w-[802px] leading-relaxed', 'md:px-6 md:py-6')}>
						{t(topPart)}
					</section>
					{hasHighlight && (
					<section className={c('flex justify-center w-full bg-light-blue py-14', 'md:py-8')}>
						<div
							className={c(
								'flex space-x-14 max-w-[802px]',
								'md:flex md:flex-col md:items-center md:px-6 md:space-x-0 md:space-y-8'
							)}
						>
							<div className="space-y-6 text-dark-blue">
								<h3 className="text-3xl font-bold">{t(pageData.highlightSection.header)}</h3>
								<ParagraphOrMultiple text={pageData.highlightSection.text} className="text-justify" />
							</div>
							<img src="/images/obligations_graphic.svg" alt="thumbnail-graphic" className="relative" />
						</div>
					</section>
					)}

					<section className={c('py-8 pb-12 space-y-4 max-w-[802px] leading-relaxed prose', 'md:px-6 md:py-6')}>
						{t(bottomPart)}
					</section>

				</div>
									<OrderButton show={!visible} text={pageData.buttonText} />
			</div>
		    <ServicesForm visibleRef={targetRef} form={servicesForm} />
		</DefaultLayout>
    );
}

export default ObligationsPage;
