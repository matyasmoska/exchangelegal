import React, { useEffect } from "react";
import ParagraphOrMultiple from "../components/Layout/ParagraphOrMultiple";
import DefaultLayout from "../layouts/DefaultLayout";
import SEO from "../components/Layout/SEO";
import { c } from "../services/misc";
import Image from 'next/image'
import pageData from '../data/pages/system-vnitrnich-zasad/system-vnitrnich-zasad.json'
import servicesData from '../data/pages/services.json'
import useServicesForm from "../components/Pages/services/hooks/useServicesForm";
import OrderButton from "../components/Pages/services/OrderButton";
import ServicesForm from "../components/Pages/services/ServícesForm";
import { useVisible } from "react-hooks-visible";
// @ts-ignore
import TopPartMdx from "../data/pages/system-vnitrnich-zasad/topPart.mdx"
// @ts-ignore
import BottomPartMdx from "../data/pages/system-vnitrnich-zasad/bottomPart.mdx"

const ObligationsPage = () => {
	const [targetRef, visible] = useVisible()

	const servicesForm = useServicesForm()

	useEffect(() => {
		servicesForm.setFieldValue('checked', servicesData.services.filter(({ id }) => id === 'system-vnitrnich-zasad'))
	}, [])

    return (
        <DefaultLayout>
			<SEO
				title="Váš systém vnitřních zásad dle požadavků AML zákona 2021 – AML solutions"
				description="✅ Kvalitní systém vnitřních zásad připravíme na míru Vašemu podnikání.  Jsme předními odborníky v oblasti AML compliance ⭐"
				keywords="AML, AML solutions, AML compliance, AML povinnosti, AML systém vnitřních zásad, AML školení, AML hodnocení rizik, AML dotazník, AML zákon, AML směrnice"
			/>
			<div className={c('relative items-center')}>
				<div className="relative w-full">
					<div className="h-[385px]">
						<Image
							layout="fill"
							objectFit="cover"
							className="absolute"
							priority
							src={'/images/system-vnitrnich-zasad.jpg'}
						/>
						<div
							className={c(
								'absolute top-0 left-0 z-10 w-full h-full from-dark-blue via-[#021C62A6] bg-gradient-to-r to-transparent',
								'md:to-dark-blue md:opacity-80'
							)}
						/>
						<div className="relative z-20 flex flex-col items-center justify-center w-full h-full text-center text-white">
							<div className="flex flex-col max-w-2xl space-y-6">
								<h1 className="text-[40px] font-bold">{pageData.header}</h1>
								<p className={c('text-xl font-medium', 'md:text-lg md:px-6')}>{pageData.shortText}</p>
							</div>
						</div>
					</div>
				</div>
				<div
					className={c(
						'flex flex-col items-center text-justify leading-relaxed pb-4',
						'md:py-6 md:pb-0'
					)}
				>
					<section className={c('py-8 space-y-4 prose max-w-[802px] leading-relaxed', 'md:px-6 md:py-6')}>
						<TopPartMdx />
					</section>
					<section className={c('flex justify-center w-full bg-light-blue py-14', 'md:py-8')}>
						<div
							className={c(
								'flex space-x-14 max-w-[802px]',
								'md:flex md:flex-col md:items-center md:px-6 md:space-x-0 md:space-y-8'
							)}
						>
							<div className="space-y-6 text-dark-blue">
								<h3 className="text-3xl font-bold">{pageData.highlightSection.header}</h3>
								<ParagraphOrMultiple text={pageData.highlightSection.text} className="text-justify" />
							</div>
							<img src="/images/obligations_graphic.svg" alt="thumbnail-graphic" className="relative" />
						</div>
					</section>

					<section className={c('py-8 pb-12 space-y-4 max-w-[802px] leading-relaxed prose', 'md:px-6 md:py-6')}>
						<BottomPartMdx />
					</section>
				</div>
				<OrderButton show={!visible} text={pageData.buttonText} />
			</div>
			<ServicesForm visibleRef={targetRef} form={servicesForm} />
		</DefaultLayout>
    );
}

export default ObligationsPage;
