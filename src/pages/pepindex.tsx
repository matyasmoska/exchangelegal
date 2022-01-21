import React from "react";
import ParagraphOrMultiple from "../components/Layout/ParagraphOrMultiple";
import Lala from "../layouts/Lala";
import SEO from "../components/Layout/SEO";
import { c } from "../services/misc";
import Image from 'next/image'
import pageData from '../data/pages/pepindex/pep.json'
import Button from "../components/Layout/Button";
import Link from "next/link";
// @ts-ignore
import TopPartMdx from "../data/pages/pepindex/topPart.mdx";
// @ts-ignore
import BottomPartMdx from "../data/pages/pepindex/bottomPart.mdx";
// @ts-ignore
import MiddlePartMdx from "../data/pages/pepindex/middlePart.mdx";


const ObligationsPage = () => {
    return (
 <Lala>
			<SEO
				title="AML solutions"
				description="Jsme předními odborníky v oblasti AML compliance, poskytujeme komplexní řešení a služby ✅ Úvodní konzultace zdarma ⭐"
				keywords="AML, AML solutions, AML compliance, AML povinnosti, AML systém vnitřních zásad, AML školení, AML hodnocení rizik, AML dotazník, AML zákon, AML směrnice"
			/>
			<div className={c('relative items-center')}>
				<div className="relative w-full">

				</div>
				<div
					className={c(
						'flex flex-col items-center text-justify leading-relaxed pb-16',
						'md:py-6 md:pb-16'
					)}
				>
					<section className={c('py-8 space-y-4 prose max-w-[802px] leading-relaxed', 'md:px-6 md:py-6')}>
						<TopPartMdx />
					</section>
					
					<section className={c('flex justify-center w-full bg-light-blue py-2', 'md:py-2')}>
					
					<section className={c('py-8 space-y-4 prose max-w-[802px] leading-relaxed', 'md:px-6 md:py-6')}>
						<MiddlePartMdx />	
					</section>
						
					</section>

					<section className={c('py-8 pb-12 space-y-4 max-w-[802px] leading-relaxed prose', 'md:px-6 md:py-6')}>
						<BottomPartMdx />
					</section>
					<div className={c('flex')}>
						<Link href="/potrebuji-aml">
							<Button type="basic" className="px-14 py-2.5">
								{ pageData.buttonText }
							</Button>
						</Link>
					</div>
				</div>
			</div>
</Lala>
    );
}

export default ObligationsPage;
