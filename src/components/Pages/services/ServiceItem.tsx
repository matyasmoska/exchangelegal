import { AnimatePresence, motion } from 'framer-motion'
import { Dispatch, FC, MouseEventHandler, useMemo } from 'react'
import { heightAnimation } from '../../../animations/navigation'
import { c } from '../../../services/misc'
import Button from '../../Layout/Button'
import { AnimatedCheckmarkIcon, CheckmarkIcon } from '../../Layout/Icons'

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
	const isSelected = useMemo(() => selectedItems.find((item: ServiceItemType) => item.name === serviceItem.name), [
		selectedItems
	])

	const deselectItem: MouseEventHandler = (e) => {
		e.stopPropagation()
		setSelectedItems(selectedItems.filter((i: ServiceItemType) => i.name !== serviceItem.name))
	}

	return (
		<div
			onClick={() => {
				if (!isSelected) setSelectedItems([ ...selectedItems, serviceItem ])
			}}
			className={c("relative flex flex-col justify-between p-8 text-left cursor-pointer text-dark-blue shadow-tile", '3xl:p-6')}
		>
			<div className="flex flex-col justify-between h-full space-y-4">
				<img src={serviceItem.icon} className={c("w-12", 'self-center')} />
				<h3 className={c("text-2xl font-bold", '3xl:text-xl', 'md:text-center md:text-2xl')}>{serviceItem.name}</h3>
				<p className={c('text-justify', '3xl:text-sm', 'md:text-justify')}>{serviceItem.description}</p>
				<div className="flex items-end justify-between">
					<p className="mb-0.5 text-sm">Cena od</p>
					<p className={c("text-3xl font-bold text-orange-primary", '3xl:text-2xl')}>{`${serviceItem.price},- Kč`}</p>
				</div>
			</div>
			<AnimatePresence>
				{isSelected && (
					<motion.div
						{...heightAnimation}
						className={c("absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full space-y-12 overflow-hidden text-white bg-dark-blue bg-opacity-90", '3xl:space-y-8 3xl:px-2')}
					>
						<CheckmarkIcon className="w-12 h-12" />
						<h3 className={c("text-2xl font-bold", '3xl:text-xl')}>{serviceItem.name}</h3>
						<Button type="basic" className="px-6 py-2 text-sm" onClick={deselectItem}>
							Odebrat
						</Button>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
