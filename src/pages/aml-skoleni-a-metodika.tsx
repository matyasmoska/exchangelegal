import React from "react";
import ParagraphOrMultiple from "../components/Layout/ParagraphOrMultiple";
import DefaultLayout from "../layouts/DefaultLayout";
import { c } from "../services/misc";
import Image from 'next/image'
import pageData from '../data/pages/aml-skoleni-a-metodika/aml-skoleni-a-metodika.json'
import Button from "../components/Layout/Button";
import Link from "next/link";
// @ts-ignore
import TopPartMdx from "../data/pages/aml-skoleni-a-metodika/topPart.mdx"
// @ts-ignore
import BottomPartMdx from "../data/pages/aml-skoleni-a-metodika/bottomPart.mdx"

const ObligationsPage = () => {
    return (
        <DefaultLayout>
			<div className={c('relative items-center')}>
				<div className="relative w-full">
					<div className="h-[385px]">
						<Image
							layout="fill"
							objectFit="cover"
							className="absolute"
							priority
							src={'/images/aml-skoleni-a-metodika.jpg'}
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

					<section className={c('py-8 pb-12 space-y-4 max-w-[802px] leading-relaxed prose', 'md:px-6 md:py-6')}>
						<BottomPartMdx />
					</section>
					<div className={c('flex')}>
						<Link href="/nase-sluzby">
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

export default ObligationsPage;
