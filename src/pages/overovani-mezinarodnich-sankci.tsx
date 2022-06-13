import React, { useEffect, useRef, useState } from "react";
import ParagraphOrMultiple from "../components/Layout/ParagraphOrMultiple";
import DefaultLayout from "../layouts/DefaultLayout";
import SEO from "../components/Layout/SEO";
import { c } from "../services/misc";
import Image from 'next/image'
import pageData from '../data/pages/overovani-mezinarodnich-sankci/overovani-mezinarodnich-sankci.json'
import servicesData from '../data/pages/services.json'
import useServicesForm from "../components/Pages/services/hooks/useServicesForm";
import OrderButton from "../components/Pages/services/OrderButton";
import ServicesForm from "../components/Pages/services/ServícesForm";
import SanctionsForm from "../components/Pages/obligations/SanctionsForm";
import Sancions from "../components/Pages/obligations/Sanctions"
import { useVisible } from "react-hooks-visible";
// @ts-ignore
import TopPartMdx from "../data/pages/overovani-mezinarodnich-sankci/topPart.mdx"
// @ts-ignore
import BottomPartMdx from "../data/pages/overovani-mezinarodnich-sankci/bottomPart.mdx"
import { useRouter } from "next/router";
import {fetchSearch} from "../services/sancions"

const ObligationsPage = () => {
	const [targetRef, visible] = useVisible()
	const [sanctionData, setSanctionData] = useState<any>({})
	const [person, setPerson] = useState<string>('')
	const form = useRef(null)

	const router = useRouter();
	const servicesForm = useServicesForm()
	
	useEffect(() => {
		if (router.isReady) {
		  const person = router.query.person?.toString()
		  if (person) {
			(async function doAsyncSearch() {
				const data = await fetchSearch(person)
				setSanctionData(data)
				setPerson(person)
			})();
		  }
		}
	  }, [router.isReady]);

	useEffect(() => {
		servicesForm.setFieldValue('checked', servicesData.services.filter(({ id }) => id === 'skoleni-na-mezinarodni-sankce'))
	}, [])

	const handleSubmitSanctions = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const data = await fetchSearch(person)
		setSanctionData(data)
		router.push(`/overovani-mezinarodnich-sankci?person=${person}`, undefined, { shallow: true })
	}
	
    return (
        <DefaultLayout>
			<SEO
				title="Ověřování mezinárodních sankcí | AML solutions"
				description="✅ Ověřujte mezinárodní sankce zdarma on-line. Splňte své zákonné AML povinnosti."
				keywords="AML školení, AML solutions, AML compliance, AML povinnosti, AML systém vnitřních zásad, AML hodnocení rizik, AML dotazník, AML formulář, AML zákon, AML směrnice"
			/>
			<div className={c('relative items-center')}>
				<div className="relative w-full">
					<div className="h-[385px]">
						<Image
							layout="fill"
							objectFit="cover"
							className="absolute"
							priority
							src={'/images/overovani-mezinarodnich-sankci.jpg'}
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

					<section className={c('py-8 pb-12 space-y-4 max-w-[802px] leading-relaxed prose', 'md:px-6 md:py-6')}>
						<TopPartMdx />
					</section>
					<section className="w-full max-w-[802px] md:px-4">
						<div className="shadow-tile p-6 space-y-6 w-full">
								<SanctionsForm person={person} onPersonChange={p => setPerson(p)} onFormSubmit={handleSubmitSanctions} />
								<Sancions data={sanctionData} />
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
