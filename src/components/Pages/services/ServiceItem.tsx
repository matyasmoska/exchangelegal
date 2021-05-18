import { AnimatePresence, motion as m } from 'framer-motion'
import { Dispatch, FC, MouseEventHandler, useMemo, useState } from 'react'
import { heightAnimation } from '../../../animations/navigation'
import { useMediaQueries } from '../../../hooks/useMediaQueries'
import { c } from '../../../services/misc'
import Button from '../../Layout/Button'
import { AnimatedCheckmarkIcon, CheckmarkIcon, CloseIcon } from '../../Layout/Icons'

export interface ServiceItemType {
	name: string
	description: string
	price: number
	icon: string
}

export interface ServiceItemProps {
	serviceItem: ServiceItemType
	selectedItems: ServiceItemType[]
	setSelectedItems: Dispatch<ServiceItemType[]>
}

export const ServiceItem: FC<ServiceItemProps> = ({ serviceItem, selectedItems, setSelectedItems }) => {
	const { isMd } = useMediaQueries()

	const isSelected = useMemo(() => selectedItems.find((item: ServiceItemType) => item.name === serviceItem.name), [
		selectedItems
	])

	const [ hover, setHover ] = useState(false)

	const deselectItem: MouseEventHandler = (e) => {
		e.stopPropagation()
		setSelectedItems(selectedItems.filter((i: ServiceItemType) => i.name !== serviceItem.name))
	}

	return (
		<div
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			onClick={() => {
				if (!isSelected && isMd) setSelectedItems([ ...selectedItems, serviceItem ])
			}}
			className={c(
				'relative flex flex-col justify-between p-8 text-left cursor-pointer text-dark-blue shadow-tile',
				'3xl:p-6'
			)}
		>
			<div className="flex flex-col justify-between h-full space-y-4">
				<img src={serviceItem.icon} className={c('w-12', 'md:self-center')} />
				<h3 className={c('text-2xl font-bold', '3xl:text-xl', 'md:text-center md:text-2xl')}>
					{serviceItem.name}
				</h3>
				<p className={c('text-justify', '3xl:text-sm', 'md:text-justify')}>{serviceItem.description}</p>
				<div className="flex items-end justify-between">
					<p className="mb-0.5 text-sm">Cena od</p>
					<p
						className={c('text-3xl font-bold text-orange-primary', '3xl:text-2xl')}
					>{`${serviceItem.price},- Kč`}</p>
				</div>
			</div>
			<AnimatePresence>
				{isSelected && (
					<m.div
						{...heightAnimation}
						className={c(
							'absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full space-y-12 overflow-hidden text-white bg-dark-blue bg-opacity-90',
							'3xl:space-y-8 3xl:px-2'
						)}
					>
						<m.div onClick={deselectItem}>
							<CloseIcon className="absolute w-8 h-8 transition transform top-5 right-5 hover:scale-110" />
						</m.div>
						<CheckmarkIcon className="w-12 h-12" />
						<h3 className={c('text-2xl font-bold', '3xl:text-xl')}>{serviceItem.name}</h3>
					</m.div>
				)}
				{hover && !isSelected && !isMd && (
					<m.div
						{...heightAnimation}
						className={c(
							'absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full space-y-12 overflow-hidden text-white bg-dark-blue bg-opacity-90',
							'3xl:space-y-8 3xl:px-2'
						)}
					>
						<h3 className={c('text-2xl font-bold', '3xl:text-xl')}>{serviceItem.name}</h3>
						<p className={c('text-2xl font-bold', '3xl:text-xl')}>Cena od {`${serviceItem.price},- Kč`}</p>
						<Button
							onClick={() => {
								if (!isSelected) setSelectedItems([ ...selectedItems, serviceItem ])
							}}
							type="basic"
							className="px-8 py-2.5"
						>
							Přidat
						</Button>
					</m.div>
				)}
			</AnimatePresence>

		</div>
	)
}
