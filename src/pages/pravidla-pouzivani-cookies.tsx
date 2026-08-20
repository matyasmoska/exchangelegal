import React from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import SEO from "../components/Layout/SEO";
import { c } from "../services/misc";
import { useTranslations } from "../hooks/useTranslations"
// @ts-ignore
import CookieRulesCsMdx from "../data/pages/pravidla-pouzivani-cookies/cookieRulesCs.mdx"
// @ts-ignore
import CookieRulesEnMdx from "../data/pages/pravidla-pouzivani-cookies/cookieRulesEn.mdx"

const cookieRules = {
	cs: <CookieRulesCsMdx />,
	en: <CookieRulesEnMdx />,
}

const CookieRulesPage = () => {
	const t = useTranslations()

    return (
        <DefaultLayout>
			<SEO
				title="Pravidla používání cookies – smenarny.legal"
description="✅ Jsme odborníky na směnárenskou činnost ⭐ Založení směnárny, povolení ČNB, AML compliance, reporting a příprava na kontrolu ČNB"
keywords="směnárna, založení směnárny, povolení k činnosti směnárníka, ČNB, AML, kontrolní směna, směnárenská činnost"
			/>
			<>
				<div
					className={c(
						'flex flex-col items-center text-justify leading-relaxed pb-16',
						'md:py-6 md:pb-16'
					)}
				>
					<section className={c('py-8 space-y-4 prose max-w-[802px] leading-relaxed', 'md:px-6 md:py-6')}>
						{t(cookieRules)}
					</section>
				</div>
			</>
		</DefaultLayout>
    );
}

export default CookieRulesPage;
