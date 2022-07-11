import React from "react";
import ParagraphOrMultiple from "../components/Layout/ParagraphOrMultiple";
import DefaultLayout from "../layouts/DefaultLayout";
import SEO from "../components/Layout/SEO";
import { c } from "../services/misc";
import Image from 'next/image'
import pageData from '../data/pages/pravni-informace-a-podminky-uziti/pravni-informace-a-podminky-uziti.json'
import Button from "../components/Layout/Button";
import Link from "next/link";
// @ts-ignore
import TopPartMdx from "../data/pages/pravni-informace-a-podminky-uziti/topPart.mdx"
// @ts-ignore
import BottomPartMdx from "../data/pages/pravni-informace-a-podminky-uziti/bottomPart.mdx"

const ObligationsPage = () => {
    return (
        <DefaultLayout>
			<SEO
				title="Právní informace a podmínky užití | 15zisif.cz"
				description="✅ Jsme odborníky v oblasti zakládání fondů ⭐ Máme unikátní zkušenosti a know-how v oblasti minifondů dle § 15 ZISIF"
				keywords="minifond, alternativní fond, § 15 ZISIF, 15zisif"
			/>
			<div className={c('relative items-center')}>

				<div
					className={c(
						'flex flex-col items-center text-justify leading-relaxed pb-16',
						'md:py-6 md:pb-16'
					)}
				>
					<section className={c('py-8 space-y-4 prose max-w-[802px] leading-relaxed', 'md:px-6 md:py-6')}>
						<TopPartMdx />
					</section>
					

					<section className={c('py-8 pb-12 space-y-4 max-w-[802px] leading-relaxed prose', 'md:px-6 md:py-6')}>
						<BottomPartMdx />
					</section>
					<div className={c('flex')}>
					
					</div>
				</div>
			</div>
		</DefaultLayout>
    );
}

export default ObligationsPage;
