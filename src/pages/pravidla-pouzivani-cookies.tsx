import React from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import SEO from "../components/Layout/SEO";
import { c } from "../services/misc";
// @ts-ignore
import CookieRulesMdx from "../data/pages/pravidla-pouzivani-cookies/cookieRules.mdx";

const CookieRulesPage = () => {
    return (
        <DefaultLayout>
			<SEO
				title="Pravidla používání cookies – AML solutions"
				description="Jsme předními odborníky v oblasti AML compliance, poskytujeme komplexní řešení a služby ✅ Úvodní konzultace zdarma ⭐"
				keywords="AML, AML solutions, AML compliance, AML povinnosti, AML systém vnitřních zásad, AML školení, AML hodnocení rizik, AML dotazník, AML zákon, AML směrnice"
			/>
			<>
				<div
					className={c(
						'flex flex-col items-center text-justify leading-relaxed pb-16',
						'md:py-6 md:pb-16'
					)}
				>
					<section className={c('py-8 space-y-4 prose max-w-[802px] leading-relaxed', 'md:px-6 md:py-6')}>
						<CookieRulesMdx />	
					</section>
				</div>
			</>
		</DefaultLayout>
    );
}

export default CookieRulesPage;
