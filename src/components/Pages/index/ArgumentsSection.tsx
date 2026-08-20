import React, { FC, useRef, useState } from 'react'
import { Fade } from 'react-awesome-reveal'
import Link from 'next/link'
import { c } from '../../../services/misc'
import Button from '../../Layout/Button'
import { useTranslations } from '../../../hooks/useTranslations'
import { ArrowDown, ArrowRight, CloseIcon, LonelyCheckmarkIcon } from '../../Layout/Icons'

import data from '../../../data/pages/arguments.json'


type PricingVariant = typeof data.pricingVariants[number]

const PricingCard: FC<{ variant: PricingVariant, buttonType: 'basic' | 'secondary' | 'light' }> = ({ variant, buttonType }) => {
	const t = useTranslations<string>()
	const { title, text, price, priceNote, buttonText, buttonLink, recommended, itemGroups } = variant
	const [openGroups, setOpenGroups] = useState<number[]>([0])

	const toggle = (index: number) =>
		setOpenGroups((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))

	return (
		<div
			className={c(
				'h-full flex flex-col space-y-6 p-6 shadow-tilearg border borderGradient',
				'md:max-w-md md:mx-auto',
				recommended && 'bg-dark-blue text-white'
			)}
		>
			<div className="flex flex-wrap gap-4 items-center md:justify-center">
				<h3 className="text-xl font-semibold">{t(title)}</h3>
				{recommended && <div className="bg-mint text-dark-blue text-sm font-semibold rounded-3xl px-2 py-1">{t(data.recommending)}</div>}
			</div>
			<p className="min-h-header-mobile md:min-h-0 md:text-center">{t(text)}</p>
			<p className="text-4xl md:text-center">
				{t(price)}
				<span className={c('text-xl', !recommended && 'text-warm-grey')}> {t(priceNote)}</span>
			</p>
			<Link href={buttonLink}>
				<Button type={buttonType} className="font-semibold px-6 py-2">
					{t(buttonText)}
				</Button>
			</Link>

			<div className="space-y-2">
				{itemGroups.map((group, groupIndex) => {
					const isOpen = openGroups.includes(groupIndex)
					const included = group.items.filter(({ checked }) => checked).length
					const total = group.items.length
					const none = included === 0

					return (
						<div key={t(group.title)} className={c('border rounded-lg overflow-hidden', recommended ? 'border-white/30' : 'border-dark-grey')}>
							<button
								type="button"
								onClick={() => toggle(groupIndex)}
								aria-expanded={isOpen}
								className={c(
									'w-full flex items-center gap-3 px-4 py-3 text-left transition',
									recommended ? 'hover:bg-white/10' : 'hover:bg-light-blue'
								)}
							>
								<span className={c('flex-grow font-semibold', none && (recommended ? 'opacity-60' : 'text-warm-grey'))}>
									{t(group.title)}
								</span>
								<span
									className={c(
										'text-sm font-semibold rounded-full px-2 py-0.5 flex-shrink-0',
										none ? 'bg-no-bg text-no' : 'bg-ok-bg text-ok'
									)}
								>
									{included}/{total}
								</span>
								<ArrowDown className={c('w-4 h-4 flex-shrink-0 transform transition-transform', isOpen && 'rotate-180')} />
							</button>

							{isOpen && (
								<div className={c('px-4 pb-4 pt-1 space-y-3', recommended ? 'border-t border-white/20' : 'border-t border-dark-grey')}>
									{group.items.map(({ checked, text: itemText }) => (
										<div key={t(itemText)} className="flex items-start">
											{checked ? (
												<LonelyCheckmarkIcon className="w-6 h-6 mr-3 mt-0.5 p-1 rounded-full flex-shrink-0 bg-ok-bg text-ok" />
											) : (
												<CloseIcon className="w-6 h-6 mr-3 mt-0.5 p-1.5 rounded-full flex-shrink-0 bg-no-bg text-no" />
											)}
											<p
												className={c('text-sm leading-snug', !checked && (recommended ? 'opacity-60' : 'text-warm-grey'))}
												dangerouslySetInnerHTML={{ __html: t(itemText) }}
											/>
										</div>
									))}
								</div>
							)}
						</div>
					)
				})}
			</div>
		</div>
	)
}

export const OptionsSection: FC<{ hideArrow?: boolean, className?: string }> = ({ hideArrow, className }) => {
	const t = useTranslations<string>()

	return (
		<div className={c(
			'font-header w-full space-y-16 mt-10 px-36', '3xl:px-28', '2xl:px-20', 'md:px-8',
			className
		)}>
			<Fade direction={'up'} triggerOnce>
				<h2 dangerouslySetInnerHTML={{ __html: t(data.optionsTitle) }} className="text-4xl font-bold text-center" />
			</Fade>
			<div className={c(
				'grid grid-cols-2 gap-x-16 gap-y-8 max-w-6xl pb-12 mx-auto', 'lg:gap-x-12', 'md:grid-cols-1',
				hideArrow && 'items-center'
			)}>
				<Fade damping={0.5} duration={500} cascade triggerOnce>
					<div>
						<img src={t(data.optionsImage)} className="md:max-w-lg mx-auto" />
					</div>
					<div className="space-y-7">
						<div className={c(
								'grid grid-cols-2 gap-x-10 gap-y-8', 'md:grid-cols-1 md:text-center',
								!hideArrow && 'mt-10 lg:mt-0'
							)}>
							{data.options.map(({ icon, text }) => (
								<div key={t(text)}>
									<img className="w-12 h-12 md:mx-auto" src={icon} />
									<p className="max-w-sm mx-auto mt-4">{t(text)}</p>
								</div>
							))}
						</div>
						<h2 dangerouslySetInnerHTML={{ __html: t(data.optionsResult) }} className="font-semibold text-2xl pt-10 md:text-center" />
						{!hideArrow && <img src="/images/sipka4.svg" className="w-64 -ml-24 md:mx-auto" />}
					</div>
				</Fade>
			</div>
		</div>
	)
}

const ArgumentsSection: FC = () => {
	const t = useTranslations<string>()

	const questionsRef = useRef<HTMLDivElement>(null)

	const handleScroll = () => questionsRef.current?.scrollIntoView({ behavior: "smooth" })

	return (
	  <>
		<div className={c('font-header w-full mt-24 px-36', '3xl:px-28', '2xl:px-20', 'md:px-8')}>
			<Fade direction={'up'} triggerOnce>
				<h2 dangerouslySetInnerHTML={{ __html: t(data.questionsTitle) }} className="text-4xl font-bold text-center" />
				<Button type="secondary" className="font-semibold max-w-max mx-auto px-6 py-2 mt-16 mb-8" onClick={handleScroll}>
					{t(data.findOutMore)}
					<ArrowDown className="w-4 h-4 ml-3.5" />
				</Button>
			</Fade>
			<div className={c('grid grid-cols-2 gap-x-16 max-w-6xl mx-auto pt-8', 'lg:gap-x-12', 'md:grid-cols-1')} ref={questionsRef}>
				<Fade damping={0.5} duration={500} cascade triggerOnce>
					<div className="text-xl leading-tight space-y-7">
						{data.questions.map(({ text }) => (
							<div key={t(text)} className="flex items-center pl-4 border-l-4 border-wine-primary min-h-question">{t(text)}</div>
						))}
						<h2 dangerouslySetInnerHTML={{ __html: t(data.questionsResult) }} className="font-semibold text-2xl pt-5 md:text-center" />
						<img src="/images/sipka2.svg" className="w-48 ml-auto md:mr-auto" />
					</div>
					<div className="md:hidden">
						<img src="/images/otazniky.svg" className="max-w-md pl-4 mt-6" />
					</div>
				</Fade>
			</div>
		</div>

		<OptionsSection />

		<div className={c('font-header w-full space-y-16 bg-light-grey py-24 px-36', '3xl:px-28', '2xl:px-20', 'md:px-8')}>
			<Fade direction={'up'} triggerOnce>
				<h2 dangerouslySetInnerHTML={{ __html: t(data.fundsTitle) }} className="text-4xl leading-tight font-bold text-center mx-auto max-w-3xl" />
			</Fade>
			<div className={c('flex flex-wrap gap-8 justify-evenly max-w-6xl mx-auto text-center')}>
				<Fade damping={0.5} duration={500} cascade triggerOnce>
					{data.funds.map(({ text, title }) => (
						<div key={t(title)} className="space-y-7">
							<h2 dangerouslySetInnerHTML={{ __html: t(title) }} className="font-semibold text-3xl leading-tight text-mint-dark" />
							<p dangerouslySetInnerHTML={{ __html: t(text) }} className="max-w-[336px] mx-auto" />
						</div>
					))}
				</Fade>
			</div>
			<Fade direction={'up'} triggerOnce>
				<Link href={data.foundFundButton.link}>
					<Button type="secondary" className="font-semibold max-w-max mx-auto px-6 py-2">
						{t(data.foundFundButton.text)}
						<ArrowRight className="w-4 h-4 ml-3.5" />
					</Button>
				</Link>
			</Fade>
		</div>

		<div className={c('font-header w-full space-y-8 mt-24 px-36', '3xl:px-28', '2xl:px-20', 'md:px-8')}>
			<Fade direction={'up'} triggerOnce>
				<h2 dangerouslySetInnerHTML={{ __html: t(data.pricingTitle) }} className="text-4xl font-bold text-center" />
				<p className="text-center">{t(data.pricingText)}</p>
			</Fade>
			<div className={c('grid grid-cols-3 gap-16', 'lg:grid-cols-1 lg:gap-8')}>
				<Fade damping={0.5} duration={500} cascade triggerOnce>
					{data.pricingVariants.map((variant, i, arr) => (
						<PricingCard
							key={t(variant.title)}
							variant={variant}
							buttonType={i === arr.length - 1 ? 'basic' : variant.recommended ? 'light' : 'secondary'}
						/>
					))}
				</Fade>
			</div>
		</div>

		<div className={c('font-header w-full space-y-16 mt-24 px-36', '3xl:px-28', '2xl:px-20', 'md:px-8')}>
			<Fade direction={'up'} triggerOnce>
				<h2 dangerouslySetInnerHTML={{ __html: t(data.argumentsTitle) }} className="text-4xl font-bold text-center" />
			</Fade>
			<div className={c('grid grid-cols-3 gap-x-16 gap-y-12', 'lg:grid-cols-2 lg:gap-12', 'md:grid-cols-1 md:gap-8')}>
				<Fade damping={0.5} duration={500} cascade triggerOnce>
					{data.arguments.map(({ icon, text, title }) => (
						<div
							key={t(title)}
							className={c(
								'h-full min-h-argument p-5 space-y-4 text-center shadow-tilearg border borderGradient',
								'md:max-w-md md:mx-auto'
							)}
						>
							<img className="w-12 h-12 mx-auto" src={icon} />
							<h3 className="text-xl font-bold py-0.5">{t(title)}</h3>
							<p className="max-w-xs mx-auto">{t(text)}</p>
						</div>
					))}
				</Fade>
			</div>
		</div>
	  </>
	)
}

export default ArgumentsSection
