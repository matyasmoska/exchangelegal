import React from "react";
import ParagraphOrMultiple from "../components/Layout/ParagraphOrMultiple";
import DefaultLayout from "../layouts/DefaultLayout";
import SEO from "../components/Layout/SEO";
import { c } from "../services/misc";
import Image from 'next/image'
import Button from "../components/Layout/Button";
import Link from "next/link";
import { useTranslations } from "../hooks/useTranslations"
// @ts-ignore
import BottomPartCsMdx from "../data/pages/pravni-informace-a-podminky-uziti/bottomPartCs.mdx"
// @ts-ignore
import BottomPartEnMdx from "../data/pages/pravni-informace-a-podminky-uziti/bottomPartEn.mdx"

const bottomPart = {
	cs: <BottomPartCsMdx />,
	en: <BottomPartEnMdx />,
}

const ObligationsPage = () => {
	const t = useTranslations()

    return (
        <DefaultLayout>
			<SEO
				title={{ cs: "Právní informace a podmínky užití | pravoprosmenarny.cz", en: "Legal information and terms of use | pravoprosmenarny.cz" }}
description={{ cs: "✅ Jsme odborníky na směnárenskou činnost ⭐ Založení směnárny, povolení ČNB, AML compliance, reporting a příprava na kontrolu ČNB", en: "✅ We are experts on currency exchange regulation ⭐ Setting up an exchange office, CNB licence, AML compliance, reporting and inspection readiness" }}
keywords={{ cs: "směnárna, založení směnárny, povolení k činnosti směnárníka, ČNB, AML, kontrolní směna, směnárenská činnost", en: "exchange office, bureau de change, CNB licence, AML, test purchase, currency exchange" }}
			/>
			<div className={c('relative items-center')}>

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
			</div>
		</DefaultLayout>
    );
}

export default ObligationsPage;
