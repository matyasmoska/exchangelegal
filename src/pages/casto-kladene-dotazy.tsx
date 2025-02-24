import DefaultLayout from '../layouts/DefaultLayout'
import SEO from '../components/Layout/SEO'
import Head from 'next/head'
import { FC, useState } from 'react'
import { MinusIcon, PlusIcon } from '../components/Layout/Icons'
import pageData from '../data/pages/casto-kladene-dotazy.json'
import { AnimatePresence, AnimateSharedLayout, motion as m } from 'framer-motion'
import { opacityAnimation } from '../animations/navigation'
import { c } from '../services/misc'
import { Translations, useTranslations } from '../hooks/useTranslations'

interface FAQuestion {
	question: Translations | string
	answer: Translations | string
}

export const QuestionDetail: FC<{ question: FAQuestion }> = ({ question }) => {
	const t = useTranslations()

	const [ isOpen, setIsOpen ] = useState<boolean>(false)

	return (
		<m.div
			layout
			className="w-full max-w-4xl p-4 space-y-3 cursor-pointer shadow-tile"
			onClick={() => setIsOpen(!isOpen)}
		>
			<m.div layout className="flex items-center space-x-2">
				{isOpen ? (
					<MinusIcon className={c("self-start flex-shrink-0 w-8 text-wine-primary mt-0.5", "md:mt-1")} />
				) : (
					<PlusIcon className={c("self-start flex-shrink-0 w-8 text-wine-primary mt-0.5", "md:mt-1")} />
				)}
				<m.h2 layout className="text-xl font-bold">
					{t(question.question)}
				</m.h2>
			</m.div>
			<AnimatePresence>
				{isOpen && (
					<m.div
						{ ...opacityAnimation }
						layout
						className={c("px-3 ml-10 prose text-justify max-w-none border-l-3 border-wine-primary", "md:ml-0")}
					>
						{t(question.answer)}
					</m.div>
				)}
			</AnimatePresence>
		</m.div>
	)
}

export default function FAQPage () {
	const t = useTranslations()

	return (
		<DefaultLayout>
			<SEO
				title="15 ZISIF – často kladené dotazy – 15zisif.cz"
				description="✅ Vy se ptáte, my odpovídáme, nejčastější otázky, které nám pokládáte v souvislosti s alternativním fondem dle § 15 ZISIF⭐"
				keywords="alternativní investiční fond, minifond, alternativní fond, § 15 ZISIF, 15zisif"
				
			/>
			<div className={c("py-16 text-justify px-36 mb-52 space-y-14", 'md:px-4 md:py-8')}>
				<h1 className={c("text-5xl font-bold leading-snug text-center", "md:text-2xl")}>{t(pageData.castokladenedotazy)}</h1>
				
				
				<AnimateSharedLayout>
					<div className={c("flex flex-col items-center px-12 space-y-7", "md:px-0")}>
						{pageData.questions.map((question: FAQuestion) => <QuestionDetail question={question} />)}
					</div>
				</AnimateSharedLayout>
			</div>
		</DefaultLayout>
	)
}
