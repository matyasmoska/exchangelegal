import Link from "next/link";
import React from "react";
import Button from "../components/Layout/Button";
import ParagraphOrMultiple from "../components/Layout/ParagraphOrMultiple";
import DefaultLayout from "../layouts/DefaultLayout";
import { c } from "../services/misc";
import Image from "next/image"
import pageData from '../data/pages/overovani-mezinarodnich-sankci/overovani-mezinarodnich-sankci.json'
// @ts-ignore
import TopPartMdx from "../data/pages/overovani-mezinarodnich-sankci/topPart.mdx"
// @ts-ignore
import BottomPartMdx from "../data/pages/overovani-mezinarodnich-sankci/bottomPart.mdx"

const InternationalSanctionsVerificationPage = () => {
    return (
        <DefaultLayout>
			<div className={c('relative items-center')}>
				<div className="relative w-full">
					<div className="h-[485px]">
						<Image
							layout="fill"
							objectFit="cover"
							className="absolute"
							priority
							src={'/images/secondary-background.jpg'}
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
						'flex flex-col items-center text-justify leading-relaxed pb-16',
						'md:py-6 md:pb-16'
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
					<div className={c('flex')}>
						<Link href="https://www.pepcheck.cz/">
							<Button type="basic" className="px-14 py-2.5">
								{ pageData.buttonText }
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</DefaultLayout>
    );
}

export default InternationalSanctionsVerificationPage;
