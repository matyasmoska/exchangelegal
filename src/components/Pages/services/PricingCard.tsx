import React, { FC, useState } from 'react'
import Link from 'next/link'
import { c } from '../../../services/misc'
import Button from '../../Layout/Button'
import { useTranslations } from '../../../hooks/useTranslations'
import { ArrowDown, CloseIcon, LonelyCheckmarkIcon } from '../../Layout/Icons'

import data from '../../../data/pages/arguments.json'

type PricingVariant = typeof data.pricingVariants[number]

// the package link carries ?sluzba=<id> so the order form on /nase-sluzby preselects it
export const PricingCard: FC<{
	variant: PricingVariant
	buttonType: 'basic' | 'secondary' | 'light'
	onSelect?: () => void
	selected?: boolean
}> = ({ variant, buttonType, onSelect, selected }) => {
	const t = useTranslations<string>()
	const { title, text, price, priceNote, buttonText, buttonLink, recommended, itemGroups } = variant
	const [openGroups, setOpenGroups] = useState<number[]>([0])

	const toggle = (index: number, event?: React.MouseEvent) => {
		event?.stopPropagation()
		setOpenGroups((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
	}

	return (
		<div
			className={c(
				'h-full flex flex-col space-y-6 p-6 shadow-tilearg border borderGradient transition',
				'md:max-w-md md:mx-auto',
				recommended && 'bg-dark-blue text-white',
				onSelect && 'cursor-pointer',
				selected && 'ring-4 ring-mint ring-offset-2'
			)}
			onClick={onSelect}
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
			{onSelect ? (
				<Button
					type={selected ? 'basic' : buttonType}
					className="font-semibold px-6 py-2"
					onClick={(event: React.MouseEvent<HTMLDivElement>) => {
						event.stopPropagation()
						onSelect()
					}}
				>
					{selected ? t(data.packageSelected) : t(buttonText)}
				</Button>
			) : (
				<Link href={variant.serviceId ? `${buttonLink}?sluzba=${variant.serviceId}` : buttonLink}>
					<Button type={buttonType} className="font-semibold px-6 py-2">
						{t(buttonText)}
					</Button>
				</Link>
			)}

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
								onClick={(event) => toggle(groupIndex, event)}
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

export default PricingCard
