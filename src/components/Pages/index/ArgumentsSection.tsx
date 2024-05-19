import React, { FC, useRef } from 'react'
import { Fade } from 'react-awesome-reveal'
import Link from 'next/link'
import { c } from '../../../services/misc'
import Button from '../../Layout/Button'
import { ArrowDown, ArrowRight } from '../../Layout/Icons'

import data from '../../../data/pages/arguments.json'

const ArgumentsSection: FC = () => {
	const questionsRef = useRef<HTMLDivElement>(null)

	const handleScroll = () => questionsRef.current?.scrollIntoView({ behavior: "smooth" })

	return (
	  <>
		<div className={c('font-header w-full mt-24 px-36', '3xl:px-28', '2xl:px-20', 'md:px-8')}>
			<Fade direction={'up'} triggerOnce>
				<h2 dangerouslySetInnerHTML={{ __html: data.questionsTitle }} className="text-4xl font-bold text-center" />
				<Button type="secondary" className="font-semibold max-w-max mx-auto px-6 py-2 mt-16 mb-8" onClick={handleScroll}>
					{data.findOutMore}
					<ArrowDown className="w-4 h-4 ml-3.5" />
				</Button>
			</Fade>
			<div className={c('grid grid-cols-2 gap-x-16 max-w-6xl mx-auto pt-8', 'lg:gap-x-12', 'md:grid-cols-1')} ref={questionsRef}>
				<Fade damping={0.5} duration={500} cascade triggerOnce>
					<div className="text-xl leading-tight space-y-7">
						{data.questions.map(({ text }) => (
							<div key={text} className="flex items-center pl-4 border-l-4 border-wine-primary min-h-question">{text}</div>
						))}
						<h2 dangerouslySetInnerHTML={{ __html: data.questionsResult }} className="font-semibold text-2xl pt-5 md:text-center" />
						<img src="/images/sipka1.svg" className="w-48 ml-auto md:mr-auto" />
					</div>
					<div className="md:hidden">
						<img src="/images/otazniky.svg" className="max-w-md pl-4 mt-6" />
					</div>
				</Fade>
			</div>
		</div>

		<div className={c('font-header w-full space-y-16 mt-10 px-36', '3xl:px-28', '2xl:px-20', 'md:px-8')}>
			<Fade direction={'up'} triggerOnce>
				<h2 dangerouslySetInnerHTML={{ __html: data.optionsTitle }} className="text-4xl font-bold text-center" />
			</Fade>
			<div className={c('grid grid-cols-2 gap-x-16 gap-y-8 max-w-6xl pb-12 mx-auto', 'lg:gap-x-12', 'md:grid-cols-1')}>
				<Fade damping={0.5} duration={500} cascade triggerOnce>
					<div>
						<img src="/images/investor-diagram.svg" className="md:max-w-lg mx-auto" />
					</div>
					<div className="space-y-7">
						<div className="grid grid-cols-2 gap-x-10 gap-y-8 mt-10 lg:mt-0 md:grid-cols-1 md:text-center">
							{data.options.map(({ icon, text }) => (
								<div key={text}>
									<img className="w-12 h-12 md:mx-auto" src={icon} />
									<p className="max-w-sm mx-auto mt-4">{text}</p>
								</div>
							))}
						</div>
						<h2 dangerouslySetInnerHTML={{ __html: data.optionsResult }} className="font-semibold text-2xl pt-10 md:text-center" />
						<img src="/images/sipka2.svg" className="w-64 -ml-24 md:mx-auto" />
					</div>
				</Fade>
			</div>
		</div>

		<div className={c('font-header w-full space-y-16 bg-light-grey py-24 px-36', '3xl:px-28', '2xl:px-20', 'md:px-8')}>
			<Fade direction={'up'} triggerOnce>
				<h2 dangerouslySetInnerHTML={{ __html: data.fundsTitle }} className="text-4xl leading-tight font-bold text-center mx-auto max-w-3xl" />
			</Fade>
			<div className={c('flex flex-wrap gap-8 justify-evenly max-w-6xl mx-auto text-center')}>
				<Fade damping={0.5} duration={500} cascade triggerOnce>
					{data.funds.map(({ text, title }) => (
						<div key={title} className="space-y-7">
							<h2 dangerouslySetInnerHTML={{ __html: title }} className="font-semibold text-5xl leading-tight" />
							<p dangerouslySetInnerHTML={{ __html: text }} className="max-w-[336px] mx-auto" />
						</div>
					))}
				</Fade>
			</div>
			<Fade direction={'up'} triggerOnce>
				<Link href={data.foundFundButton.link}>
					<Button type="secondary" className="font-semibold max-w-max mx-auto px-6 py-2">
						{data.foundFundButton.text}
						<ArrowRight className="w-4 h-4 ml-3.5" />
					</Button>
				</Link>
			</Fade>
		</div>

		<div className={c('font-header w-full space-y-16 mt-24 px-36', '3xl:px-28', '2xl:px-20', 'md:px-8')}>
			<Fade direction={'up'} triggerOnce>
				<h2 dangerouslySetInnerHTML={{ __html: data.argumentsTitle }} className="text-4xl font-bold text-center" />
			</Fade>
			<div className={c('grid grid-cols-3 gap-x-16 gap-y-12', 'lg:grid-cols-2 lg:gap-12', 'md:grid-cols-1 md:gap-8')}>
				<Fade damping={0.5} duration={500} cascade triggerOnce>
					{data.arguments.map(({ icon, text, title }) => (
						<div
							key={title}
							className={c(
								'h-full min-h-argument p-5 space-y-4 text-center shadow-tilearg border borderGradient',
								'md:max-w-md md:mx-auto'
							)}
						>
							<img className="w-12 h-12 mx-auto" src={icon} />
							<h3 className="text-xl font-bold py-0.5">{title}</h3>
							<p className="max-w-xs mx-auto">{text}</p>
						</div>
					))}
				</Fade>
			</div>
		</div>
	  </>
	)
}

export default ArgumentsSection
