import React from "react";
import ParagraphOrMultiple from "../components/Layout/ParagraphOrMultiple";
import DefaultLayout from "../layouts/DefaultLayout";
import SEO from "../components/Layout/SEO";
import { c } from "../services/misc";
import Image from 'next/image'
import pageData from '../data/pages/povinnosti-spravce-fondu/povinnosti-spravce-fondu.json'
import Button from "../components/Layout/Button";
import Link from "next/link";
import { useTranslations } from "../hooks/useTranslations"
// @ts-ignore
import BottomPartCsMdx from "../data/pages/povinnosti-spravce-fondu/bottomPartCs.mdx"
// @ts-ignore
import BottomPartEnMdx from "../data/pages/povinnosti-spravce-fondu/bottomPartEn.mdx"

const bottomPart = {
	cs: <BottomPartCsMdx />,
	en: <BottomPartEnMdx />,
}

const ObligationsPage = () => {
	const t = useTranslations()

    return (
        <DefaultLayout>
			<SEO
				title="15 ZISIF – povinnosti správce fondu – 15zisif.cz"
description="✅ Jsme odborníky v oblasti zakládání fondů ⭐ Máme unikátní zkušenosti a know-how v oblasti alternativních fondů dle § 15 ZISIF"
keywords="alternativní investiční fond, minifond, alternativní fond, § 15 ZISIF, 15zisif"
			/>
			<div className={c('relative items-center')}>
				<div className="relative w-full">
					<div className="h-[385px]">
						<Image
							layout="fill"
							objectFit="cover"
							className="absolute"
							priority
							src={'/images/povinnosti-spravce-fondu.jpg'}
						/>
						<div
							className={c(
								'absolute top-0 left-0 z-10 w-full h-full from-dark-blue via-[#021C62A6] bg-gradient-to-r to-transparent',
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
