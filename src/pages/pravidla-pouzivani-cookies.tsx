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
				title="Pravidla používání cookies – 15zisif.cz"
				description="✅ Jsme odborníky v oblasti zakládání fondů ⭐ Máme unikátní zkušenosti a know-how v oblasti minifondů dle § 15 ZISIF"
				keywords="minifond, alternativní fond, § 15 ZISIF, 15zisif"
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
