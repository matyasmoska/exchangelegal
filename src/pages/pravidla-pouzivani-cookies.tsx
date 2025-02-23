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
				title="15 ZISIF – pravidla používání cookies – 15zisif.cz"
description="✅ Jsme odborníky v oblasti zakládání fondů ⭐ Máme unikátní zkušenosti a know-how v oblasti alternativních fondů dle § 15 ZISIF"
keywords="alternativní investiční fond, minifond, alternativní fond, § 15 ZISIF, 15zisif"
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
